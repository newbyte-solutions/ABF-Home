import { RequestHandler } from 'express';

export const checkAdmin: RequestHandler = (req, res, next) => {
    const user = (req as any).user;

    if (user && user.role === 'admin') {
        return next();
    }

    res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions.' });
};

export default checkAdmin;
