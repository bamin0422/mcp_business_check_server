"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
class HealthController {
    constructor() {
        this.getHealth = (req, res) => {
            const healthStatus = {
                status: "OK",
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                memory: process.memoryUsage(),
            };
            res.json(healthStatus);
        };
        this.getApiInfo = (req, res) => {
            const apiInfo = {
                name: "MCP Business Check Server",
                version: "1.0.0",
                description: "사업자등록번호 진위 및 정보 조회 MCP 서버",
                endpoints: {
                    "POST /register-key": "인증키 등록",
                    "GET /check-business/:bizNumber": "사업자등록번호 진위 확인",
                    "GET /health": "서버 상태 확인",
                },
                timestamp: new Date().toISOString(),
            };
            res.json(apiInfo);
        };
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=HealthController.js.map