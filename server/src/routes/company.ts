import express, { Request, Response } from "express";
import { isAdmin, isStudent } from "../middleware/auth";
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
    console.log(`Saving file to upload path: ${uploadPath}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    console.log(`Generated filename: ${fileName}`);
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
    console.log(`File upload attempt - Filename: ${file.originalname}, Mimetype: ${file.mimetype}`);
    if (extname && mimetype) {
      return cb(null, true);
    }
    console.error(`File upload rejected - Invalid file type: ${file.originalname}`);
    cb(new Error("Only image files are allowed!"));
  },
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  console.log("GET /companies - Fetching all companies");
  try {
    const companies = await Company.find();
    console.log(`Successfully retrieved ${companies.length} companies`);
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Error fetching companies" });
  }
});

router.post(
  "/new_company",
  isAdmin,
  upload.single("companyLogo"),
  async (req: Request, res: Response): Promise<void> => {
    console.log("POST /companies/new_company - Creating new company");
    const data = req.body;

    const companyLogo = req.file
      ? `https://husarbeidslivsfag.com:5000/api/uploads/${req.file.filename}`
      : req.body.companyLogo;

    console.log(`Company logo path: ${companyLogo}`);

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
      companyCreatedAt: new Date(),
    });

    try {
      const company = await newCompany.save();
      console.log(`Successfully created company: ${company._id}`);
      res.status(201).json(company);
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(500).json({ message: "Error creating the company" });
    }
  },
);

router.delete(
  "/:id",
  isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`DELETE /companies/delete_company/${req.params.id}`);
    try {
      const company = await Company.findByIdAndDelete(req.params.id);
      if (!company) {
        console.log(`Company not found with ID: ${req.params.id}`);
        res.status(404).json({ message: "Company not found" });
        return;
      }
      console.log(`Successfully deleted company: ${req.params.id}`);
      res.json({ message: "Company deleted successfully" });
    } catch (error) {
      console.error(`Error deleting company ${req.params.id}:`, error);
      res.status(500).json({ message: "Error deleting the company" });
    }
  },
);

router.put(
  "/update_company/:id",
  [isAdmin, isStudent],
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /companies/update_company/${req.params.id}`);
    try {
      const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!company) {
        console.log(`Company not found with ID: ${req.params.id}`);
        res.status(404).json({ message: "Company not found" });
        return;
      }
      console.log(`Successfully updated company: ${req.params.id}`);
      res.json(company);
    } catch (error) {
      console.error(`Error updating company ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating the company" });
    }
  },
);

export default router;