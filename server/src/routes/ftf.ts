import express from "express";
import FtfItem from "../models/FtfItem";

const router = express.Router();

// Create item (admin)
import { Request, Response } from "express";

router.post("/items", async (req: Request, res: Response): Promise<void> => {
  console.log("POST /items - Creating new item");
  const {
    id,
    name,
    description,
    category,
    type,
    tags,
    images,
    ageRating,
    ageRequirements,
    specs,
    visibility,
    status,
    currentUser,
  } = req.body;

  // Basic validation
  if (
    !id ||
    !name ||
    !description ||
    !category ||
    !type ||
    !ageRating
) {
    console.log("POST /items - Validation failed: Missing required fields");
    res.status(400).json({ message: "Missing required fields." });
    return;
  }

  // Check for duplicate id
  const existing = await FtfItem.findOne({ id });
  if (existing) {
    console.log(`POST /items - Duplicate id found: ${id}`);
    res.status(409).json({ message: "Item with this id already exists." });
    return;
  }

  try {
    const item = await FtfItem.create({
      id,
      name,
      description,
      category,
      type,
      tags,
      images,
      ageRating,
      ageRequirements,
      specs,
      visibility,
      status,
      currentUser,
    });
    console.log(`POST /items - Successfully created item with id: ${id}`);
    res.status(201).json(item);
  } catch (err) {
    console.error("POST /items - Error creating item:", err);
    res.status(400).json({ message: "Failed to create item", error: err });
  }
});

// Get all items (public)
router.get("/items", async (req, res) => {
  console.log("GET /items - Fetching all items");
  const items = await FtfItem.find();
  console.log(`GET /items - Found ${items.length} items`);
  res.json(items);
});

// Get single item (public)
router.get("/items/:id", async (req, res): Promise<void> => {
  console.log(`GET /items/${req.params.id} - Fetching single item`);
  const item = await FtfItem.findById(req.params.id);
  if (!item) {
    console.log(`GET /items/${req.params.id} - Item not found`);
    res.status(404).json({ message: "Item not found" });
    return;
  }
  console.log(`GET /items/${req.params.id} - Successfully retrieved item`);
  res.json(item);
});

// Update item (admin)
router.put("/items/:id", async (req, res): Promise<void> => {
  console.log(`PUT /items/${req.params.id} - Updating item`);
  const item = await FtfItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    console.log(`PUT /items/${req.params.id} - Item not found`);
    res.status(404).json({ message: "Item not found" });
    return;
  }
  console.log(`PUT /items/${req.params.id} - Successfully updated item`);
  res.json(item);
});

// Delete item (admin)
router.delete("/items/:id", async (req, res): Promise<void> => {
  console.log(`DELETE /items/${req.params.id} - Deleting item`);
  const item = await FtfItem.findByIdAndDelete(req.params.id);
  if (!item) {
    console.log(`DELETE /items/${req.params.id} - Item not found`);
    res.status(404).json({ message: "Item not found" });
    return;
  }
  console.log(`DELETE /items/${req.params.id} - Successfully deleted item`);
  res.json({ message: "Item deleted" });
});

export default router;