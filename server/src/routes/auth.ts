import express from 'express'
import user from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router()
import { checkAdmin } from '../middleware/auth';

router.post('/login', async (req: express.Request, res: express.Response) => {
    console.log('Login attempt initiated');
    const data = req.body;
    console.log('Request body:', data);

    try {
        console.log('Searching for user with email:', data.email);
        const foundUser = await user.findOne({ email: data.email.toLowerCase() });

        if (foundUser) {
            console.log('User found:', foundUser.email);
            console.log('Validating password...');
            const isPasswordValid = await bcrypt.compare(data.password, foundUser.password);
            // Successfully found the user, now validating the password
            if (isPasswordValid) {
                console.log('Password validation successful');
                console.log('Login successful for user:', foundUser.email);

                // Generate a JWT token with the user's role and ID
                const token = jwt.sign(
                    { id: foundUser._id, role: foundUser.role },
                    'your-secret-key',
                    { expiresIn: '1h' }
                );

                // Respond with token and role
                res.status(200).json({ token, role: foundUser.role });
            // Error handling
            } else {
                console.log('Password validation failed for user:', foundUser.email);
                res.status(401).json({ message: 'Unauthorized' });
            }
        } else {
            console.log('No user found with email:', data.email);
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }

    // Default response
    console.log('Login attempt completed');
});

router.post('/register', async (req: express.Request, res: express.Response) => {
    const data = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await user.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
    });

    res.status(201).json(newUser);

    console.log(newUser);
});
module.exports = router