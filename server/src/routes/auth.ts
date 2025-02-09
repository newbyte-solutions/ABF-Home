import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { isAdmin, isStudent } from '../middleware/auth';

const router = express.Router();

// Admin Login Route
router.post('/admin_login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user || user.role !== 'admin') {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
  
      // Set session after successful login
      req.session.user = { email: user.email, role: user.role };
      req.session.save((err) => {
        if (err) {
          console.error('[Auth] Error saving session:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json({
            message: 'Login successful',
            user: { email: user.email, role: user.role },
          });
        }
      });
  
    } catch (error) {
      console.error('[Auth] Error during admin login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
// Student Login
router.post('/student_login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user || user.role !== 'student') {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    req.session.user = { email: user.email, role: user.role };
    req.session.save((err) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Login successful', user: { email: user.email, role: user.role } });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Register a new user (admin only)
router.post('/register', isAdmin, async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    res.status(400).json({ message: 'All fields required' });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Logout
router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    res.status(200).json({ message: 'Logout successful' });
  });
});

export default router;
