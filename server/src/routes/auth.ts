import express, { Request, Response, NextFunction, response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import {
  isAdmin,
  isStudent,
  isAdminOrStudent,
  isLoggedIn,
} from "../middleware/auth";
import mongoose from "mongoose";

const router = express.Router();

// get all users
router.get("/", async (req: Request, res: Response): Promise<void> => {
  console.log("[Auth] Attempting to fetch all users");
  try {
    const users = await User.find();
    console.log("[Auth] Successfully fetched all users");
    res.status(200).json(users);
  } catch (error) {
    console.error("[Auth] Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// get user by id
router.get(
  "/get_user/:id",
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log("[Auth] Attempting to fetch user by ID:", id);

    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("[Auth] Invalid user ID format:", id);
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    try {
      const user = await User.findById(id);
      if (!user) {
        console.log("[Auth] User not found with ID:", id);
        res.status(404).json({ message: "User not found" });
        return;
      }
      console.log("[Auth] Successfully fetched user:", id);
      res.status(200).json(user);
    } catch (error) {
      console.error("[Auth] Error fetching user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

// Login Route
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  console.log("[Auth] Login attempt initiated");
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("[Auth] Login attempt failed: Missing email or password");
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    console.log("[Auth] Attempting to find user with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("[Auth] Login failed: User not found with email:", email);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("[Auth] Login failed: Invalid password for", email);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    req.session.user = { email: user.email, role: user.role };
    req.session.save((err) => {
      if (err) {
        console.error("[Auth] Error saving session:", err);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        console.log("[Auth] Admin login successful:", email);
        res.status(200).json({
          message: "Login successful",
          user: { email: user.email, role: user.role },
        });
      }
    });
  } catch (error) {
    console.error("[Auth] Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update user
router.put(
  "/:id",
  isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { username, email, password, role, phone, grade } = req.body;
    console.log("[Auth] Attempting to update user with ID:", id);
    try {
      const user = await User.findById(id);
      if (!user) {
        console.log("[Auth] User not found with ID:", id);
        res.status(404).json({ message: "User not found" });
        return;
      }
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;
      if (role) user.role = role;
      if (phone) user.phone = phone;
      if (grade) user.grade = grade;
      await user.save();
      console.log("[Auth] User updated successfully:", user);
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("[Auth] Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

// Register a new user (admin only)
router.post(
  "/register",
  isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, role, phone, grade } = req.body;
    console.log("[Auth] Attempting to register new user:", email);

    if (!username || !email || !password || !role) {
      console.log("[Auth] Registration failed: Missing required fields");
      res.status(400).json({ message: "All fields required" });
      return;
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("[Auth] Registration failed: User already exists -", email);
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        phone,
        grade,
      });
      await newUser.save();

      console.log("[Auth] New user registered successfully:", email);
      res.status(201).json({
        message: "User registered successfully",
        user: { email: newUser.email, role: newUser.role },
      });
    } catch (error) {
      console.error("[Auth] Error during user registration:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

router.post(
  "/update_password",
  async (req: Request, res: Response): Promise<void> => {
    const { email, oldPassword, newPassword } = req.body;
    console.log("[Auth] Attempting to update password for user:", email);

    try {
      const user = await User.findOne({ email });

      if (!user) {
        console.log("[Auth] Password update failed: User not found -", email);
        res.status(404).json({ message: "User not found" });
        return;
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        console.log(
          "[Auth] Password update failed: Incorrect old password -",
          email,
        );
        res.status(400).json({ message: "Old password is incorrect" });
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      console.log("[Auth] Password updated successfully for user:", email);
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("[Auth] Error updating password:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Logout
router.post("/logout", (req: Request, res: Response) => {
  const userEmail = req.session.user?.email;
  console.log("[Auth] Attempting to logout user:", userEmail);
  req.session.destroy((err) => {
    if (err) {
      console.error("[Auth] Error during logout:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    console.log("[Auth] User logged out successfully:", userEmail);
    res.status(200).json({ message: "Logout successful" });
  });
});

// Me
router.get("/me", async (req: Request, res: Response): Promise<void> => {
  if (req.session.user) {
    console.log(
      "[Auth] Attempting to fetch user info for:",
      req.session.user.email,
    );
    try {
      const user = await User.findOne({ email: req.session.user.email });
      if (!user) {
        console.log(
          "[Auth] User not found in database:",
          req.session.user.email,
        );
        res.status(404).json({ message: "User not found" });
        return;
      }
      console.log("[Auth] User info retrieved successfully:", user.email);
      res.status(200).json({
        user: {
          email: user.email,
          id: user._id,
          role: user.role,
          username: user.username,
          phone: user.phone,
          grade: user.grade,
        },
      });
    } catch (error) {
      console.error("[Auth] Error retrieving user info:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    console.log("[Auth] Unauthorized access to /me endpoint");
    res.status(401).json({ message: "User not authenticated" });
  }
});

router.get(
  "/make_admin",
  async (req: Request, res: Response): Promise<void> => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    console.log("[Auth] Attempting to create admin user");

    if (!email || !password) {
      console.log("[Auth] Make admin failed: Missing environment variables");
      res
        .status(400)
        .json({ message: "Admin email and password are required" });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });

      await newUser.save();
      console.log("[Auth] Admin user created successfully:", email);
      res.status(201).json({ message: "Admin user created successfully" });
    } catch (error) {
      console.error("[Auth] Error creating admin user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

// Toggle isFTF
router.put("/:id/toggle_isFTF", isAdmin, async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  console.log("[Auth] Attempting to toggle isFTF for user with ID:", userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("[Auth] User not found with ID:", userId);
      res.status(404).json({ message: "User not found" });
      return;
    }
    user.isFTF = !user.isFTF;
    await user.save();
    console.log("[Auth] isFTF toggled successfully for user:", userId);
    res.status(200).json({ message: "isFTF toggled successfully", user });
  } catch (error) {
    console.error("[Auth] Error toggling isFTF:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete user
router.delete("/:id", isAdmin, async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  console.log("[Auth] Attempting to delete user with ID:", userId);

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.log("[Auth] User not found with ID:", userId);
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log("[Auth] User deleted successfully:", userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("[Auth] Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
