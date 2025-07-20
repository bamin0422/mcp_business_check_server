import { Router } from "express";
import { BusinessController } from "../controllers/BusinessController.js";
import { AuthMiddleware } from "../middleware/auth.js";
import { ValidationMiddleware } from "../middleware/validation.js";

export function createBusinessRouter(
  businessController: BusinessController,
  authMiddleware: AuthMiddleware,
  validationMiddleware: ValidationMiddleware
): Router {
  const router = Router();

  // 사업자등록번호 진위 및 정보 조회 엔드포인트
  router.get(
    "/check-business/:bizNumber",
    authMiddleware.checkApiKey,
    validationMiddleware.validateBusinessNumber,
    businessController.checkBusiness
  );

  return router;
}
