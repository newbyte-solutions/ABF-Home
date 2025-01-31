import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import User, { IUser } from '../models/user';
import { checkAdmin, checkStudent } from '../middleware/auth';

const router = express.Router();

// Passport Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    console.log(`[Auth] Attempting authentication for email: ${email}`);
    try {
        const foundUser = await User.findOne({ email: email.toLowerCase() });
        if (!foundUser) {
            console.log(`[Auth] User not found for email: ${email}`);
            return done(null, false, { message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        console.log(`[Auth] Password validation ${isPasswordValid ? 'successful' : 'failed'} for email: ${email}`);
        return isPasswordValid ? done(null, foundUser) : done(null, false, { message: 'Invalid credentials' });
    } catch (err) {
        console.error('[Auth] Error during authentication:', err);
        return done(err);
    }
}));

passport.serializeUser((user: Express.User, done) => {
    console.log(`[Auth] Serializing user: ${(user as IUser).id}`);
    done(null, (user as IUser).id);
});

passport.deserializeUser(async (id, done) => {
    console.log(`[Auth] Deserializing user ID: ${id}`);
    try {
        const foundUser = await User.findById(id);
        console.log(`[Auth] User deserialized successfully: ${foundUser?.email}`);
        done(null, foundUser);
    } catch (err) {
        console.error('[Auth] Error deserializing user:', err);
        done(err);
    }
});

// Admin Login
router.post('/login_admin', (req: Request, res: Response, next: NextFunction) => {
    console.log('[Auth] Admin login attempt');
    passport.authenticate('local', (err: any, user: IUser, info: any) => {
        if (err) {
            console.error('[Auth] Admin login error:', err);
            return next(err);
        }
        if (!user) {
            console.log('[Auth] Admin login failed:', info.message);
            return res.status(401).json({ message: info.message });
        }

        if (user.role !== 'admin') {
            console.log(`[Auth] Access denied: User ${user.email} attempted admin login with role ${user.role}`);
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('[Auth] Admin login session error:', err);
                return next(err);
            }
            console.log(`[Auth] Admin login successful: ${user.email}`);
            return res.status(200).json({ message: 'Admin login successful', user: { email: user.email, role: user.role } });
        });
    })(req, res, next);
});

// Student Login
router.post('/login_student', (req: Request, res: Response, next: NextFunction) => {
    console.log('[Auth] Student login attempt');
    passport.authenticate('local', (err: any, user: IUser, info: any) => {
        if (err) {
            console.error('[Auth] Student login error:', err);
            return next(err);
        }
        if (!user) {
            console.log('[Auth] Student login failed:', info.message);
            return res.status(401).json({ message: info.message });
        }

        if (user.role !== 'student') {
            console.log(`[Auth] Access denied: User ${user.email} attempted student login with role ${user.role}`);
            return res.status(403).json({ message: 'Access denied: Students only' });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('[Auth] Student login session error:', err);
                return next(err);
            }
            console.log(`[Auth] Student login successful: ${user.email}`);
            return res.status(200).json({ message: 'Student login successful', user: { email: user.email, role: user.role } });
        });
    })(req, res, next);
});

// Register a new user
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    console.log('[Auth] New user registration attempt');
    try {
        const { username, email, password, role } = req.body;
        console.log(`[Auth] Registration details - Username: ${username}, Email: ${email}, Role: ${role}`);

        // Validate input
        if (!username || !email || !password || !role) {
            console.log('[Auth] Registration failed: Missing required fields');
            res.status(400).json({ message: 'All fields required' });
            return;
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`[Auth] Registration failed: User already exists with email ${email}`);
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        console.log('[Auth] Hashing password for new user');
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        console.log(`[Auth] User registered successfully: ${email}`);

        res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email, role: newUser.role } });
    } catch (error) {
        console.error('[Auth] Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Logout User
router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    console.log('[Auth] Logout attempt');
    req.logout((err) => {
        if (err) {
            console.error('[Auth] Logout error:', err);
            return next(err);
        }
        console.log('[Auth] User logged out successfully');
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

export default router;