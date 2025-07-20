import { Request, Response, NextFunction } from "express";
import { ConfigService } from "../services/ConfigService.js";
import { AuthenticationError } from "../utils/errors.js";

export class AuthMiddleware {
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  checkApiKey = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const apiKey = this.configService.requireApiKey();
      (req as any).apiKey = apiKey;
      next();
    } catch (error) {
      next(error);
    }
  };
}
