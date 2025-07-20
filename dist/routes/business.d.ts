import { Router } from "express";
import { BusinessController } from "../controllers/BusinessController.js";
import { AuthMiddleware } from "../middleware/auth.js";
import { ValidationMiddleware } from "../middleware/validation.js";
export declare function createBusinessRouter(businessController: BusinessController, authMiddleware: AuthMiddleware, validationMiddleware: ValidationMiddleware): Router;
//# sourceMappingURL=business.d.ts.map