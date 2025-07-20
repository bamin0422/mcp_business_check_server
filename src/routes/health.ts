import { Router } from "express";
import { HealthController } from "../controllers/HealthController.js";

export function createHealthRouter(healthController: HealthController): Router {
  const router = Router();

  // 헬스체크 엔드포인트
  router.get("/health", healthController.getHealth);

  // API 정보 엔드포인트
  router.get("/", healthController.getApiInfo);

  return router;
}
