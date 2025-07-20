"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessCheckService = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_js_1 = require("../utils/errors.js");
const validators_js_1 = require("../utils/validators.js");
class BusinessCheckService {
    constructor(configService) {
        this.configService = configService;
    }
    async checkBusinessNumber(bizNumber) {
        // 입력 유효성 검증
        (0, validators_js_1.validateBusinessNumber)(bizNumber);
        // API 키 가져오기
        const apiKey = this.configService.requireApiKey();
        // 공공데이터포털 API 호출 (POST 방식, body에 b_no 배열 전달)
        const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${encodeURIComponent(apiKey)}`;
        let data;
        try {
            const response = await axios_1.default.post(url, { b_no: [bizNumber] }, {
                headers: { "Content-Type": "application/json" },
                timeout: 10000, // 10초 타임아웃
            });
            data = response.data;
            // API 응답 검증
            if (!data || !data.data || data.data.length === 0) {
                throw new errors_js_1.NotFoundError("등록된 사업자가 없습니다.");
            }
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error("API 응답 에러:", error.response?.data);
                if (error.code === "ECONNABORTED") {
                    throw new errors_js_1.ApiError("API 요청 시간 초과", 408);
                }
                if (error.response?.status === 401) {
                    throw new errors_js_1.ApiError("인증키가 유효하지 않습니다.", 401);
                }
                throw new errors_js_1.ApiError(`API 호출 실패: ${error.response?.status || "UNKNOWN"} - ${JSON.stringify(error.response?.data || error.message)}`, error.response?.status || 500);
            }
            throw error;
        }
        // 진위 체크 및 사업자 정보 리턴
        const bizInfo = data.data[0];
        return {
            isValid: bizInfo.tax_type === "국세청에 등록된 사업자입니다.",
            businessName: bizInfo.b_nm || "정보 없음",
            ownerName: bizInfo.b_owner || "정보 없음",
            address: bizInfo.b_addr || "정보 없음",
            status: bizInfo.tax_type || "정보 없음",
            raw: bizInfo,
        };
    }
}
exports.BusinessCheckService = BusinessCheckService;
//# sourceMappingURL=BusinessCheckService.js.map