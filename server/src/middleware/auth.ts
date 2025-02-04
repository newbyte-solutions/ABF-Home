import express, { Request, Response, NextFunction } from 'express';

// auth middleware
export const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.debug(req.session);
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return; // Return after sending the response
  }
  if (req.session.user.role !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return; // Return after sending the response
  }
  next();
};

export const isStudent = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.debug(req.session);
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return; // Return after sending the response
  }
  if (req.session.user.role !== "student") { 
    res.status(403).json({ error: "Forbidden" });
    return; // Return after sending the response
  }
  next();
};

 

module.exports = { isAdmin, isStudent };