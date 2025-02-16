import express, { Request, Response } from "express";
import Article from "../models/article";
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

router.post(
  "/new_article",
  upload.single("articleImage"),
  async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.articleImageUrl;

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
      res.status(201).json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving the article" });
    }
  },
);

// Get all articles
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

// Get article by ID (_id or id)
router.get(
  "/article/:id",
  async (req: Request, res: Response): Promise<void> => {
    const normalizedId = req.params.id;
    if (!normalizedId) {
      res.status(400).json({ message: "Invalid article ID" });
      return;
    }

    try {
      const article = await Article.findById(normalizedId);
      if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch the article" });
    }
  },);

// Delete article by ID (_id or id)
router.delete(
  "/article/:_id",
  async (req: Request, res: Response): Promise<void> => {
    const normalizedId = req.params.id;
    if (!normalizedId) {
      res.status(400).json({ message: "Invalid article ID" });
      return;
    }

    try {
      const article = await Article.findById(normalizedId);
      if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      await article.deleteOne();
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete the article" });
    }
  },);


export default router;