import express, { Request, Response } from "express";
import { isAdmin } from "../middleware/auth";
import Company from "../models/company";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer storage configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching companies" });
  }
});

router.post(
  "/new_company",
  upload.single("companyLogo"),
  async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

    const companyLogo = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.companyLogo;

      const newCompany = new Company({
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        companyPhone: data.companyPhone,
        companyContactPerson: data.companyContactPerson,
        companyFounded: data.companyFounded,
        companyGrade: data.companyGrade,
        companyLogo: companyLogo,
        companyStudents: data.companyStudents,
        companyWebsite: data.companyWebsite,
        companyDescription: data.companyDescription,
        companyContent: data.companyContent,
        companyTags: data.companyTags,
        companyCreatedAt: new Date()
      });

    try {
      const company = await newCompany.save();
      res.status(201).json(company);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating the company" });
    }
  },
);

export default router;