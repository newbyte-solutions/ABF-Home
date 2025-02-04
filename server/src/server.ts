import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import Session from "./models/session";
import mongoose from 'mongoose';
import { connectDB } from './db';
import authRoute from './routes/auth';
import companyRoute from './routes/company';
import newsRoute from './routes/news';
import { env } from 'process';

// App Config
const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();
const corsConfig = {
    origin: '*',
    optionsSuccessStatus: 200,
};

const sess = {
    secret: "keyboard cat",
    cookie: { secure: false },
    saveUninstialized: true,
    resave: false,
};

declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
  }

if (app.get("env") === "production") {
    console.log(
      "Production environment detected, setting trust proxy and secure cookies"
    );
    app.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

// Middleware
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('public'));
app.use(session(sess));

// Routes
app.use('/auth', authRoute);
app.use('/company', companyRoute);
app.use('/news', newsRoute);

// Run app
app.listen(port, () => {
    console.log(`App running on ${port}`);
});