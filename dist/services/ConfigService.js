"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const fs_1 = __importDefault(require("fs"));
const errors_js_1 = require("../utils/errors.js");
class ConfigService {
    constructor(configFile = "./config.json") {
        this.configFile = configFile;
    }
    getApiKey() {
        if (!fs_1.default.existsSync(this.configFile)) {
            return null;
        }
        try {
            const data = fs_1.default.readFileSync(this.configFile, "utf-8");
            const config = JSON.parse(data);
            return config.apiKey || null;
        }
        catch (err) {
            console.error("인증키 파일 읽기 오류:", err);
            return null;
        }
    }
    setApiKey(apiKey) {
        try {
            const config = { apiKey };
            fs_1.default.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
        }
        catch (error) {
            console.error("인증키 저장 오류:", error);
            throw new Error("인증키 저장에 실패했습니다.");
        }
    }
    isApiKeyConfigured() {
        return this.getApiKey() !== null;
    }
    requireApiKey() {
        const apiKey = this.getApiKey();
        if (!apiKey) {
            throw new errors_js_1.AuthenticationError("인증키가 등록되어 있지 않습니다. 공공데이터포털에서 인증키를 발급받아 등록해 주세요.");
        }
        return apiKey;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=ConfigService.js.map