import { Request, Response, NextFunction } from "express";
import { BusinessCheckService } from "../services/BusinessCheckService.js";
import { generateRequestId } from "../utils/validators.js";

export class BusinessController {
  private businessCheckService: BusinessCheckService;

  constructor(businessCheckService: BusinessCheckService) {
    this.businessCheckService = businessCheckService;
  }

  checkBusiness = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { bizNumber } = req.params;
      const result = await this.businessCheckService.checkBusinessNumber(
        bizNumber
      );

      res.json({
        ...result,
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
      });
    } catch (error) {
      next(error);
    }
  };
}
