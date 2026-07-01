import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Route not found: ${req.originalUrl}`,
  });
};

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  void next;

  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
