import { Request, Response, NextFunction } from "express";
import { ConfigService } from "../services/ConfigService.js";
export declare class ConfigController {
    private configService;
    constructor(configService: ConfigService);
    registerApiKey: (req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=ConfigController.d.ts.map