import { Request, Response, NextFunction } from "express";
import { validateBusinessNumber, validateApiKey } from "../utils/validators.js";

export class ValidationMiddleware {
  validateBusinessNumber = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const { bizNumber } = req.params;
      validateBusinessNumber(bizNumber);
      next();
    } catch (error) {
      next(error);
    }
  };

  validateApiKeyBody = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const { apiKey } = req.body;
      validateApiKey(apiKey);
      next();
    } catch (error) {
      next(error);
    }
  };
}
