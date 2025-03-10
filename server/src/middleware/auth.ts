import express from "express";

export const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (!req.session?.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (req.session.user.role !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
};
export const isStudent = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (!req.session?.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (req.session.user.role !== "student") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
};
