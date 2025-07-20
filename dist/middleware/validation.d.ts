import { Request, Response, NextFunction } from "express";
export declare class ValidationMiddleware {
    validateBusinessNumber: (req: Request, res: Response, next: NextFunction) => void;
    validateApiKeyBody: (req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=validation.d.ts.map