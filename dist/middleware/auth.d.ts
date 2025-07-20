import { Request, Response, NextFunction } from "express";
import { ConfigService } from "../services/ConfigService.js";
export declare class AuthMiddleware {
    private configService;
    constructor(configService: ConfigService);
    checkApiKey: (req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=auth.d.ts.map