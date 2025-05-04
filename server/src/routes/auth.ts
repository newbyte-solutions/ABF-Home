import express, { Request, Response, NextFunction, response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { isAdmin, isStudent, isAdminOrStudent, isLoggedIn } from "../middleware/auth";
import mongoose from "mongoose";
import { promises } from "dns";

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
router.get("/get_user/:id", async (req: Request, res: Response): Promise<void> => {
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
});

// Admin Login Route
router.post(
  "/admin_login",
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("[Auth] Login attempt failed: Missing email or password");
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    try {
      const user = await User.findOne({ email });
      if (!user || user.role !== "admin") {
        console.log("[Auth] Admin login failed: Invalid credentials for", email);
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("[Auth] Admin login failed: Invalid password for", email);
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Set session after successful login
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
      console.error("[Auth] Error during admin login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

// Student Login
router.post(
  "/student_login",
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("[Auth] Student login attempt failed: Missing email or password");
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    try {
      const user = await User.findOne({ email });
      if (!user || user.role !== "student") {
        console.log("[Auth] Student login failed: Invalid credentials for", email);
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("[Auth] Student login failed: Invalid password for", email);
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      req.session.user = { email: user.email, role: user.role, studentId: user.id };
      req.session.save((err) => {
        if (err) {
          console.error("[Auth] Error saving session:", err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          console.log("[Auth] Student login successful:", email);
          res.status(200).json({
            message: "Login successful",
            user: { email: user.email, role: user.role },
          });
        }
      });
    } catch (error) {
      console.error("[Auth] Error during student login:", error);
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

router.post('/update_password',   async (req: Request, res: Response): Promise<void> => {
  const { email, oldPassword, newPassword } = req.body;
  console.log("[Auth] Attempting to update password for user:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("[Auth] Password update failed: User not found -", email);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      console.log("[Auth] Password update failed: Incorrect old password -", email);
      res.status(400).json({ message: 'Old password is incorrect' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log("[Auth] Password updated successfully for user:", email);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('[Auth] Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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

// Check admin
router.get("/check_admin", isAdmin, (req: Request, res: Response) => {
  console.log("[Auth] Admin authentication check passed for:", req.session.user?.email);
  res.status(200).json({ message: "Admin authenticated", role: "admin" });
});

// Check student
router.get("/check_student", isStudent, (req: Request, res: Response) => {
  console.log("[Auth] Student authentication check passed for:", req.session.user?.email);
  res.status(200).json({ message: "Student authenticated", role: "student" });
});

// Check if user is logged in
router.get("/check_login", (req: Request, res: Response) => {
  if (req.session.user) {
    console.log("[Auth] Login check: User is logged in -", req.session.user.email);
    res
      .status(200)
      .json({ message: "User is logged in", user: req.session.user });
  } else {
    console.log("[Auth] Login check: User is not logged in");
    res.status(401).json({ message: "User is not logged in" });
  }
});

// Me
router.get("/me", async (req: Request, res: Response): Promise<void> => {
  if (req.session.user) {
    console.log("[Auth] Attempting to fetch user info for:", req.session.user.email);
    try {
      const user = await User.findOne({ email: req.session.user.email });
      if (!user) {
        console.log("[Auth] User not found in database:", req.session.user.email);
        res.status(404).json({ message: "User not found" });
        return;
      }
      console.log("[Auth] User info retrieved successfully:", user.email);
      res.status(200).json({ user: { email: user.email, id: user._id, role: user.role, username: user.username, phone: user.phone, grade: user.grade } });
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

router.get(
  "/remove_admin",
  async (req: Request, res: Response): Promise<void> => {
    const email = process.env.ADMIN_EMAIL;
    const username = "admin";
    console.log("[Auth] Attempting to remove admin user");

    try {
      const adminUser = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });
      if (!adminUser) {
        console.log("[Auth] Remove admin failed: Admin user not found");
        res.status(404).json({ message: "Admin user not found" });
        return;
      }

      await User.deleteOne({ $or: [{ username: username }, { email: email }] });
      console.log("[Auth] Admin user removed successfully:", email);
      res.status(200).json({ message: "Admin user removed successfully" });
    } catch (error) {
      console.error("[Auth] Error removing admin user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
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