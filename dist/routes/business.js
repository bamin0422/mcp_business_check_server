"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBusinessRouter = createBusinessRouter;
const express_1 = require("express");
function createBusinessRouter(businessController, authMiddleware, validationMiddleware) {
    const router = (0, express_1.Router)();
    // 사업자등록번호 진위 및 정보 조회 엔드포인트
    router.get("/check-business/:bizNumber", authMiddleware.checkApiKey, validationMiddleware.validateBusinessNumber, businessController.checkBusiness);
    return router;
}
//# sourceMappingURL=business.js.map