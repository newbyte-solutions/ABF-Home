import express, { Request, Response } from "express";
import { isAdmin, isStudent, isAdminOrStudent } from "../middleware/auth";
import Company from "../models/company";
import User from "../models/user";
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
    console.log(
      `File upload attempt - Filename: ${file.originalname}, Mimetype: ${file.mimetype}`,
    );
    if (extname && mimetype) {
      return cb(null, true);
    }
    console.error(
      `File upload rejected - Invalid file type: ${file.originalname}`,
    );
    cb(new Error("Only image files are allowed!"));
  },
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  console.log("GET /company - Fetching all companies");
  try {
    const companies = await Company.find();
    console.log(`Successfully retrieved ${companies.length} companies`);
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Error fetching companies" });
  }
});

// get company by id
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  console.log(`GET /company/${req.params.id} - Fetching company by ID`);
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      console.log(`Company not found with ID: ${req.params.id}`);
      res.status(404).json({ message: "Company not found" });
      return;
    }
    console.log(`Successfully retrieved company: ${req.params.id}`);
    res.json(company);
  } catch (error) {
    console.error(`Error fetching company ${req.params.id}:`, error);
    res.status(500).json({ message: "Error fetching the company" });
  }
});

router.post(
  "/new_company",
  isAdminOrStudent,
  upload.single("companyLogo"),
  async (req: Request, res: Response): Promise<void> => {
    console.log("POST /company/new_company - Creating new company");
    const data = req.body;

    const companyLogo = req.file
      ? `https://husarbeidslivsfag.com/uploads/${req.file.filename}`
      : req.body.companyLogo;

    console.log(`Company logo path: ${companyLogo}`);

    const tempCompany = new Company();
    data.companyId = tempCompany._id;
    const companyWebsite =
      process.env.CLIENT_URL + "/company/" + data.companyId;

    // If the user is a student, automatically add their ID to companyStudents
    let companyStudents = data.companyStudents || [];
    if (req.session?.user?.role === "student") {
      const user = await User.findOne({ email: req.session.user.email });
      if (user) {
        const studentId = user._id.toString();
        if (!companyStudents.includes(studentId)) {
          companyStudents.push(studentId);
        }
        console.log(`Student ${studentId} automatically added to company`);
      }
    }

    const newCompany = new Company({
      companyId: data.companyId,
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      companyContactPerson: data.companyContactPerson,
      companyFounded: data.companyFounded,
      companyGrade: data.companyGrade,
      companyLogo: companyLogo,
      companyStudents: companyStudents,
      companyWebsite: companyWebsite,
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
    console.log(`DELETE /company/delete_company/${req.params.id}`);
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
  "/:id",
  isAdminOrStudent,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /company/${req.params.id}`);
    try {
      const existingCompany = await Company.findById(req.params.id);
      if (!existingCompany) {
        res.status(404).json({ message: "Company not found" });
        return;
      }

      // Merge editable fields (or simply Object.assign for everything)
      const updatableFields = [
        "companyName",
        "companyEmail",
        "companyPhone",
        "companyContactPerson",
        "companyGrade",
        "companyFounded",
        "companyDescription",
        "companyContent",
        "companyTags",
        "companyLogo",
        "companyWebsite",
        "companyStudents",
        "companyCreatedAt",
      ];

      for (const field of updatableFields) {
        if (field in req.body) {
          existingCompany.set(field, req.body[field]);
        }
      }

      const updatedCompany = await existingCompany.save();
      console.log(`Successfully updated company: ${req.params.id}`);
      res.json(updatedCompany);
    } catch (error) {
      console.error(`Error updating company ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating the company" });
    }
  },
);

router.put(
  "/update_content/:id",
  isAdminOrStudent,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /company/update_content/${req.params.id}`);
    try {
      const company = await Company.findByIdAndUpdate(
        req.params.id,
        { companyContent: req.body.companyContent },
        { new: true },
      );
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

router.put(
  "/update_students/:id",
  isAdminOrStudent,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /company/update_students/${req.params.id}`);
    try {
      const company = await Company.findById(req.params.id);

      if (!company) {
        console.log(`Company not found with ID: ${req.params.id}`);
        res.status(404).json({ message: "Company not found" });
        return;
      }

      let updatedCompany;
      if (company.companyStudents.includes(req.body.studentId)) {
        updatedCompany = await Company.findByIdAndUpdate(
          req.params.id,
          { $pull: { companyStudents: req.body.studentId } },
          { new: true },
        );
        console.log(
          `Student ${req.body.studentId} removed from company ${req.params.id}`,
        );
      } else {
        updatedCompany = await Company.findByIdAndUpdate(
          req.params.id,
          { $push: { companyStudents: req.body.studentId } },
          { new: true },
        );
        console.log(
          `Student ${req.body.studentId} added to company ${req.params.id}`,
        );
      }

      console.log(`Successfully updated company: ${req.params.id}`);
      res.json(updatedCompany);
    } catch (error) {
      console.error(`Error updating company ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating the company" });
    }
  },
);

router.put(
  "/update_tags/:id",
  isAdminOrStudent,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /company/update_tags/${req.params.id}`);
    try {
      const company = await Company.findByIdAndUpdate(
        req.params.id,
        { companyTags: req.body.companyTags },
        { new: true },
      );
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

router.put(
  "/update_description/:id",
  isAdminOrStudent,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /company/update_description/${req.params.id}`);
    try {
      const company = await Company.findByIdAndUpdate(
        req.params.id,
        { companyDescription: req.body.companyDescription },
        { new: true },
      );
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

router.get(
  "/user_company/:username",
  isAdminOrStudent,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`GET /company/user_company/${req.params.username}`);
    try {
      const user = req.params.username;

      const company = await Company.findOne({ companyStudents: user });
      if (!company) {
        console.log(`Company not found for user with ID: ${user}`);
        res.status(404).json({ message: "Company not found" });
        return;
      }

      console.log(`Successfully retrieved company for user: ${user}`);
      res.json(company);
    } catch (error) {
      console.error(
        `Error fetching company for user ${req.params.username}:`,
        error,
      );
      res.status(500).json({ message: "Error fetching the company" });
    }
  },
);

router.put(
  "/toggle_ftf/:id",
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /company/toggle_ftf/${req.params.id}`);
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        console.log(`Company not found with ID: ${req.params.id}`);
        res.status(404).json({ message: "Company not found" });
        return;
      }

      const updatedCompany = await Company.findByIdAndUpdate(
        req.params.id,
        { companyIsFTF: !company.companyIsFTF },
        { new: true },
      );

      if (!updatedCompany) {
        console.log(`Failed to update company with ID: ${req.params.id}`);
        res.status(500).json({ message: "Failed to update company" });
        return;
      }

      console.log(
        `Successfully toggled FTF status for company: ${req.params.id} to ${updatedCompany.companyIsFTF}`,
      );
      res.json(updatedCompany);
    } catch (error) {
      console.error(`Error toggling FTF for company ${req.params.id}:`, error);
      res.status(500).json({ message: "Error toggling FTF status" });
      return;
    }
  },
);
export default router;
