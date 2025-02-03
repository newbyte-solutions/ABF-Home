import express, { Request, Response, NextFunction } from 'express';
const router = express.Router()
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user';

// Admin Login
router.post('/login_admin', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
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
    } catch (error) {
        console.error('[Auth] Error during admin login:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
});

// Student Login
router.post('/login_student', (req: Request, res: Response, next: NextFunction) => {
    console.log('[Auth] Student login attempt');
    
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

export default router;