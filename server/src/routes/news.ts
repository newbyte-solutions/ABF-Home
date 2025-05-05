import express, { Request, Response } from "express";
import Article from "../models/article";
import multer from "multer";
import path from "path";
import fs from "fs";
import { isAdminOrStudent } from "../middleware/auth";
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

router.post(
  "/new_article",
  isAdminOrStudent,
  upload.single("articleImage"),
  async (req: Request, res: Response): Promise<void> => {
    console.log(`Creating new article with title: ${req.body.articleTitle}`);
    const data = req.body;

    const imageUrl = req.file
      ? `https://husarbeidslivsfag.com/uploads/${req.file.filename}`
      : req.body.articleImageUrl;

    const newArticle = new Article({
      articleTitle: req.body.articleTitle,
      articleDescription: req.body.articleDescription,
      articleContent: req.body.articleContent,
      articleAuthor: req.body.articleAuthor,
      articleTags: req.body.articleTags.split(","),
      articleImageUrl: imageUrl,
      articleCompany: req.body.articleCompany,
      articleGrade: req.body.articleGrade,
    });

    try {
      const article = await newArticle.save();
      console.log(`Article created successfully with ID: ${article._id}`);
      res.status(201).json(article);
    } catch (error) {
      console.error("Error creating article:", error);
      res.status(500).json({ message: "Error saving the article" });
    }
  },
);

// Get all articles
router.get("/", async (req: Request, res: Response): Promise<void> => {
  console.log("Fetching all articles");
  try {
    const articles = await Article.find();
    console.log(`Found ${articles.length} articles`);
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

// Get article by ID (_id or id)
router.get(
  "/article/:id",
  async (req: Request, res: Response): Promise<void> => {
    const normalizedId = req.params.id;
    console.log(`Fetching article with ID: ${normalizedId}`);
    if (!normalizedId) {
      console.log("Invalid article ID provided");
      res.status(400).json({ message: "Invalid article ID" });
      return;
    }

    try {
      const article = await Article.findById(normalizedId);
      if (!article) {
        console.log(`Article with ID ${normalizedId} not found`);
        res.status(404).json({ message: "Article not found" });
        return;
      }
      console.log(`Successfully retrieved article: ${article.articleTitle}`);
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Failed to fetch the article" });
    }
  },
);

// Delete article by id
router.delete(
  "/article/:id",
  isAdminOrStudent,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`Attempting to delete article with ID: ${req.params.id}`);
    try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) {
        console.log(`Article with ID ${req.params.id} not found for deletion`);
        res.status(404).json({ message: "Article not found" });
        return;
      }

      console.log(`Successfully deleted article with ID: ${req.params.id}`);
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).json({ message: "Failed to delete the article" });
    }
  },
);

router.put(
  "/article/:id",
  isAdminOrStudent,
  async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /article/${req.params.id}`);
    console.log("Request body:", req.body);
    try {
      console.log(`Attempting to find article with ID: ${req.params.id}`);
      const existingArticle = await Article.findById(req.params.id);
      if (!existingArticle) {
        console.log(`Article with ID ${req.params.id} not found`);
        res.status(404).json({ message: "Article not found" });
        return;
      }
      console.log("Found existing article:", existingArticle);

      const updatableFields = [
        "id",
        "articleTitle",
        "articleDescription",
        "articleContent",
        "articleAuthor",
        "articlePublishedDate",
        "articleTags",
        "articleImageUrl",
        "articleCompany",
        "articleGrade",
      ];

      console.log(
        "Updating fields:",
        updatableFields.filter((field) => field in req.body),
      );
      for (const field of updatableFields) {
        if (field in req.body) {
          console.log(`Updating field ${field} with value:`, req.body[field]);
          existingArticle.set(field, req.body[field]);
        }
      }

      console.log("Saving updated article...");
      const updatedArticle = await existingArticle.save();
      console.log(`Successfully updated article: ${req.params.id}`);
      console.log("Updated article details:", updatedArticle);
      res.json(updatedArticle);
    } catch (error) {
      console.error(`Error updating article ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating the article" });
    }
  },
);
export default router;
