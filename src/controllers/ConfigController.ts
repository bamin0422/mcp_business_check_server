import { Request, Response, NextFunction } from "express";
import { ConfigService } from "../services/ConfigService.js";

export class ConfigController {
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  registerApiKey = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { apiKey } = req.body;
      this.configService.setApiKey(apiKey);

      res.json({
        message: "인증키가 성공적으로 등록되었습니다.",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };
}
