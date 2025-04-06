import express from "express";

// Check admin
export const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (!req.session?.user) {
    console.log("[Auth] 401 - Unauthorized")
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (req.session.user.role !== "admin") {
    console.log("[Auth] 403 - Forbidden")
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
};

// Check student
export const isStudent = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (!req.session?.user) {
    console.log("[Auth] 401 - Unauthorized")
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (req.session.user.role !== "student") {
    console.log("[Auth] 403 - Forbidden")
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
};

// Check admin or student
export const isAdminOrStudent = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (!req.session?.user) {
    console.log("[Auth] 401 - Unauthorized");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const role = req.session.user.role;
  if (role !== "admin" && role !== "student") {
    console.log("[Auth] 403 - Forbidden");
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
};