import express, { Request, Response, NextFunction } from 'express';
const router = express.Router()
import { isAdmin, isStudent } from "../middleware/auth";
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user';
import { error } from 'console';

// Admin Login
router.post('/admin_login', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    console.log('[Auth] Admin login attempt')
    try {
        const { email, password } = req.body

        // Validate input
        if (!email || !password) {
            console.log('[Auth] Admin login failed: Missing credentials')
            res.status(400).json({ message: 'Email and password are required' })
            return
        }

        // Find user and verify role
        const user = await User.findOne({ email })
        if (!user || user.role !== 'admin') {
            console.log('[Auth] Admin login failed: Invalid credentials or not an admin')
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            console.log('[Auth] Admin login failed: Invalid password')
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        console.log(`[Auth] Admin login successful: ${email}`)
        res.status(200).json({
            message: 'Login successful',
            user: {
                email: user.email,
                role: user.role
            }
        })

        // Set session  
        req.session.user = {
            email: user.email,
            role: user.role
        };

    } catch (error) {
        console.error('[Auth] Error during admin login:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
});

// Student Login
router.post('/student_login0', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('[Auth] Student login attempt')
    try {
        const { email, password } = req.body

        // Validate input
        if (!email || !password) {
            console.log('[Auth] Student login failed: Missing credentials')
            res.status(400).json({ message: 'Email and password are required' })
            return
        }

        // Find user and verify role
        const user = await User.findOne({ email })
        if (!user || user.role !== 'student') {
            console.log('[Auth] Student login failed: Invalid credentials or not a student')
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            console.log('[Auth] Student login failed: Invalid password')
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        console.log(`[Auth] Student login successful: ${email}`)
        res.status(200).json({
            message: 'Login successful',
            user: {
                email: user.email,
                role: user.role
            }
        })

        // Set session  
        req.session.user = {
            email: user.email,
            role: user.role
        };

    } catch (error) {
        console.error('[Auth] Error during student login:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
});

// Register a new user
router.post('/register', isAdmin, async (req: express.Request, res: express.Response) => {
    console.log('[Auth] New user registration attempt');
    try {
        const { username, email, password, role } = req.body;
        console.log(`[Auth] Registration details - Username: ${username}, Email: ${email}, Role: ${role}`);

        // Validate input
        if (!username || !email || !password || !role) {
            console.log('[Auth] Registration failed: Missing required fields');
            res.status(400).json({ message: 'All fields required' });
            return; // Make sure the function returns after sending a response
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`[Auth] Registration failed: User already exists with email ${email}`);
            res.status(400).json({ message: 'User already exists' });
            return; // Return after response
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

// Check admin
router.get('/check_admin', isAdmin, (req: express.Request, res: express.Response) => {
    console.log('[Auth] Checking role');
    if (req.session.user) {
        console.log(`[Auth] User role: ${req.session.user.role}`);
        res.status(200).json({ role: req.session.user.role });
    } else {
        console.log('[Auth] User not logged in');
        res.status(401).json({ message: 'User not logged in' });
    }
});

// Check student
router.get('/check_student', isStudent, (req: express.Request, res: express.Response) => {
    console.log('[Auth] Checking role');
    if (req.session.user) {
        console.log(`[Auth] User role: ${req.session.user.role}`);
        res.status(401).json({ message: 'User not logged in' });
    }
});

// Logout
router.post('/logout', (req: express.Request, res: express.Response) => {
    console.log('[Auth] Logging out');
    req.session.destroy((err) => {
        if (err) {
            console.error('[Auth] Error during logout:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            console.log('[Auth] Logout successful');
            res.status(200).json({ message: 'Logout successful' });
        }
    });
});
export default router;