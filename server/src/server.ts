import express from "express";
import cors from "cors";
import session from "express-session";
import { connectDB } from "./db";
import authRoute from "./routes/auth";
import companyRoute from "./routes/company";
import newsRoute from "./routes/news";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

// App Config
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ENV Config
dotenv.config({ path: "./config/.env" });

// CORS Config
const corsConfig = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Session Config
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/abf";

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "keyboard_cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  },
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
  }),
};

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

// Middleware: Serve static files
console.log("Configuring static file serving");
app.use("/uploads", express.static("./uploads"), (req, res, next) => {
  console.log(`Serving static file: ${req.url}`);
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Apply middleware
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static("uploads"));

// Routes
app.use("/auth", authRoute);
app.use("/company", companyRoute);
app.use("/news", newsRoute);

// Start Server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});