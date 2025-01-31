import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user';

// Middleware to check if user is an admin
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && req.user && (req.user as IUser).role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
};

// Middleware to check if user is a student
export const checkStudent = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && req.user && (req.user as IUser).role === 'student') {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Student access required' });
};

// Middleware to check if user is a guest (not authenticated)
export const checkGuest = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Guest access only' });
};