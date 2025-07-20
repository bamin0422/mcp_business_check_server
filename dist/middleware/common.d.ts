import { Request, Response, NextFunction } from "express";
export declare class CommonMiddleware {
    cors: (req: Request, res: Response, next: NextFunction) => void;
    logging: (req: Request, res: Response, next: NextFunction) => void;
    notFound: (req: Request, res: Response, next: NextFunction) => void;
    errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=common.d.ts.map