"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBusinessNumber = validateBusinessNumber;
exports.validateApiKey = validateApiKey;
exports.generateRequestId = generateRequestId;
exports.sanitizeInput = sanitizeInput;
const errors_js_1 = require("./errors.js");
function validateBusinessNumber(bizNumber) {
    if (!bizNumber) {
        throw new errors_js_1.ValidationError("사업자등록번호가 필요합니다.");
    }
    // 사업자등록번호 형식 체크 (숫자 10자리, 하이픈 없는 형태)
    if (!/^\d{10}$/.test(bizNumber)) {
        throw new errors_js_1.ValidationError("사업자등록번호 형식이 올바르지 않습니다. 10자리 숫자만 입력하세요.");
    }
}
function validateApiKey(apiKey) {
    if (!apiKey) {
        throw new errors_js_1.ValidationError("apiKey가 필요합니다.");
    }
    if (typeof apiKey !== "string" || apiKey.trim().length === 0) {
        throw new errors_js_1.ValidationError("유효한 apiKey를 입력해주세요.");
    }
}
function generateRequestId() {
    return Math.random().toString(36).substr(2, 9);
}
function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, "");
}
//# sourceMappingURL=validators.js.map