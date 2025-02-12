import express, { Request, Response } from "express";
import { isAdmin } from "../middleware/auth";
import Company from "../models/company";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up file upload folder
const uploadDir = path.join(__dirname, "../uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Ensure the uploads directory exists
import fs from "fs";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Register a new company (Admin Only)
router.post(
  "/register-company",
  isAdmin,
  upload.single("companyLogo"),
  async (req: Request, res: Response): Promise<void> => {
    const {
      companyName,
      email,
      phone,
      contactPerson,
      registrationDate,
      grade,
    } = req.body;
    const companyLogo = req.file ? req.file.filename : null;

    if (
      !companyName ||
      !email ||
      !phone ||
      !contactPerson ||
      !registrationDate ||
      !grade
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    try {
      const existingCompany = await Company.findOne({ email });
      if (existingCompany) {
        res.status(400).json({ message: "Company already exists" });
        return;
      }

      const newCompany = new Company({
        companyName,
        email,
        phone,
        contactPerson,
        registrationDate,
        grade,
        companyLogo,
      });

      await newCompany.save();
      res
        .status(201)
        .json({
          message: "Company registered successfully",
          company: newCompany,
        });
    } catch (error) {
      console.error("Company registration error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

// Get all companies
router.get("/companies", async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Serve uploaded files statically
router.use("/uploads", express.static(uploadDir));

export default router;