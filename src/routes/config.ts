import { Router } from "express";
import { ConfigController } from "../controllers/ConfigController.js";
import { ValidationMiddleware } from "../middleware/validation.js";

export function createConfigRouter(
  configController: ConfigController,
  validationMiddleware: ValidationMiddleware
): Router {
  const router = Router();

  // 인증키 등록 엔드포인트
  router.post(
    "/register-key",
    validationMiddleware.validateApiKeyBody,
    configController.registerApiKey
  );

  return router;
}
