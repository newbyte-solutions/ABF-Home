import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { connectDB } from './db';
import authRoute from './routes/auth';
import companyRoute from './routes/company';
import newsRoute from './routes/news';

// App Config
const app = express();
const port = 5000;

const corsConfig = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(session({
    secret: 'secretos',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
}));

// Connect to MongoDB
connectDB();

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('public'));

// Local Routes
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('This is the main route for the Express Template V1 running JS');
});

// Routes
app.use('/auth', authRoute);
app.use('/company', companyRoute);
app.use('/news', newsRoute);

// Run app
app.listen(port, () => {
    console.log(`App running on ${port}`);
});