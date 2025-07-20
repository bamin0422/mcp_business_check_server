"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConfigService_js_1 = require("./services/ConfigService.js");
const BusinessCheckService_js_1 = require("./services/BusinessCheckService.js");
const MCPService_js_1 = require("./services/MCPService.js");
const BusinessController_js_1 = require("./controllers/BusinessController.js");
const ConfigController_js_1 = require("./controllers/ConfigController.js");
const HealthController_js_1 = require("./controllers/HealthController.js");
const auth_js_1 = require("./middleware/auth.js");
const validation_js_1 = require("./middleware/validation.js");
const common_js_1 = require("./middleware/common.js");
const business_js_1 = require("./routes/business.js");
const config_js_1 = require("./routes/config.js");
const health_js_1 = require("./routes/health.js");
class App {
    constructor() {
        this.port = parseInt(process.env.PORT || "3000");
        this.app = (0, express_1.default)();
        this.isMCPServer =
            process.env.MCP_SERVER === "true" || process.argv.includes("--mcp");
        // 서비스 초기화
        this.configService = new ConfigService_js_1.ConfigService();
        this.businessCheckService = new BusinessCheckService_js_1.BusinessCheckService(this.configService);
        this.mcpService = new MCPService_js_1.MCPService(this.businessCheckService, this.configService);
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }
    setupMiddleware() {
        const commonMiddleware = new common_js_1.CommonMiddleware();
        // 기본 미들웨어
        this.app.use(express_1.default.json({ limit: "1mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // 공통 미들웨어
        this.app.use(commonMiddleware.cors);
        this.app.use(commonMiddleware.logging);
    }
    setupRoutes() {
        // 컨트롤러 초기화
        const businessController = new BusinessController_js_1.BusinessController(this.businessCheckService);
        const configController = new ConfigController_js_1.ConfigController(this.configService);
        const healthController = new HealthController_js_1.HealthController();
        // 미들웨어 초기화
        const authMiddleware = new auth_js_1.AuthMiddleware(this.configService);
        const validationMiddleware = new validation_js_1.ValidationMiddleware();
        // 라우터 생성
        const businessRouter = (0, business_js_1.createBusinessRouter)(businessController, authMiddleware, validationMiddleware);
        const configRouter = (0, config_js_1.createConfigRouter)(configController, validationMiddleware);
        const healthRouter = (0, health_js_1.createHealthRouter)(healthController);
        // 라우터 적용
        this.app.use("/", healthRouter);
        this.app.use("/", businessRouter);
        this.app.use("/", configRouter);
    }
    setupErrorHandling() {
        const commonMiddleware = new common_js_1.CommonMiddleware();
        // 404 핸들러
        this.app.use(commonMiddleware.notFound);
        // 전역 에러 핸들러
        this.app.use(commonMiddleware.errorHandler);
    }
    async start() {
        try {
            // MCP 서버 시작
            await this.mcpService.start();
            // Express 서버는 MCP 전용 모드가 아닐 때만 시작
            if (!this.isMCPServer) {
                this.app.listen(this.port, () => {
                    console.error(`Express 서버가 http://localhost:${this.port} 에서 실행 중입니다.`);
                    console.error(`환경: ${process.env.NODE_ENV || "development"}`);
                });
            }
        }
        catch (error) {
            console.error("서버 시작 실패:", error);
            process.exit(1);
        }
    }
}
// 프로세스 종료 핸들러
process.on("SIGTERM", () => {
    console.error("SIGTERM 신호를 받았습니다. 서버를 종료합니다.");
    process.exit(0);
});
process.on("SIGINT", () => {
    console.error("SIGINT 신호를 받았습니다. 서버를 종료합니다.");
    process.exit(0);
});
// 서버 시작
const app = new App();
app.start().catch((error) => {
    console.error("서버 시작 실패:", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map