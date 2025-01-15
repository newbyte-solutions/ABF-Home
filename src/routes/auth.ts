import express from 'express'
import user from '../models/user';
import bcrypt from 'bcrypt';
const router = express.Router()
import { checkAdmin } from '../middleware/auth';

router.get('/login', async (req: express.Request, res: express.Response) => {
    const data = req.body;

    const foundUser = await user.findOne({
        where: {
            email: data.email
        }
    });

    if (foundUser) {
        const isPasswordValid = await bcrypt.compare(data.password, foundUser.password);
        if (isPasswordValid) {
            res.status(200).json(foundUser);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

router.post('/register', checkAdmin, async (req: express.Request, res: express.Response) => {
    const data = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await user.create({
        email: data.email,
        password: hashedPassword
    });

    res.status(201).json(newUser);
});
module.exports = router