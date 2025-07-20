import { Request, Response, NextFunction } from "express";
import { BusinessCheckService } from "../services/BusinessCheckService.js";
export declare class BusinessController {
    private businessCheckService;
    constructor(businessCheckService: BusinessCheckService);
    checkBusiness: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=BusinessController.d.ts.map