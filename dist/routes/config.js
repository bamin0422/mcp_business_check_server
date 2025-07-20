"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigRouter = createConfigRouter;
const express_1 = require("express");
function createConfigRouter(configController, validationMiddleware) {
    const router = (0, express_1.Router)();
    // 인증키 등록 엔드포인트
    router.post("/register-key", validationMiddleware.validateApiKeyBody, configController.registerApiKey);
    return router;
}
//# sourceMappingURL=config.js.map