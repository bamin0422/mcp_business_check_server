"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthRouter = createHealthRouter;
const express_1 = require("express");
function createHealthRouter(healthController) {
    const router = (0, express_1.Router)();
    // 헬스체크 엔드포인트
    router.get("/health", healthController.getHealth);
    // API 정보 엔드포인트
    router.get("/", healthController.getApiInfo);
    return router;
}
//# sourceMappingURL=health.js.map