import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { connectDB } from './db';
import authRoute from './routes/auth';
import companyRoute from './routes/company';
import newsRoute from './routes/news';
import MongoStore from 'connect-mongo';

// App Config
const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();

const corsConfig = {
  origin: 'http://localhost:3000',  // The URL of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Session Config
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/abf';

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'keyboard_cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Secure cookies in production
    maxAge: 86400000,  // 1 day in milliseconds
  },
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    ttl: 14 * 24 * 60 * 60,  // 2 weeks TTL
  }),
};

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

// Apply middleware
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('public'));

// Routes
app.use('/auth', authRoute);
app.use('/company', companyRoute);
app.use('/news', newsRoute);

// Start Server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
