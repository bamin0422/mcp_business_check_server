"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigService_js_1 = require("./services/ConfigService.js");
const BusinessCheckService_js_1 = require("./services/BusinessCheckService.js");
const MCPService_js_1 = require("./services/MCPService.js");
// MCP 서버만 실행
async function startMCPServer() {
    try {
        const configService = new ConfigService_js_1.ConfigService();
        const businessCheckService = new BusinessCheckService_js_1.BusinessCheckService(configService);
        const mcpService = new MCPService_js_1.MCPService(businessCheckService, configService);
        await mcpService.start();
    }
    catch (error) {
        console.error("MCP 서버 시작 실패:", error);
        process.exit(1);
    }
}
// 프로세스 종료 핸들러
process.on("SIGTERM", () => {
    console.error("SIGTERM 신호를 받았습니다. MCP 서버를 종료합니다.");
    process.exit(0);
});
process.on("SIGINT", () => {
    console.error("SIGINT 신호를 받았습니다. MCP 서버를 종료합니다.");
    process.exit(0);
});
// MCP 서버 시작
startMCPServer();
//# sourceMappingURL=mcp-server.js.map