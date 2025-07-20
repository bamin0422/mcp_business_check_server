"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPService = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
class MCPService {
    constructor(businessCheckService, configService) {
        this.businessCheckService = businessCheckService;
        this.configService = configService;
        this.server = new index_js_1.Server({
            name: "business-check-server",
            version: "1.0.0",
        });
        this.setupTools();
    }
    setupTools() {
        // MCP 도구 정의
        const tools = [
            {
                name: "check_business_number",
                description: "사업자등록번호의 진위를 확인하고 사업자 정보를 조회합니다.",
                inputSchema: {
                    type: "object",
                    properties: {
                        businessNumber: {
                            type: "string",
                            description: "확인할 사업자등록번호 (10자리 숫자, 하이픈 제외)",
                        },
                    },
                    required: ["businessNumber"],
                },
            },
            {
                name: "register_api_key",
                description: "공공데이터포털 API 인증키를 등록합니다.",
                inputSchema: {
                    type: "object",
                    properties: {
                        apiKey: {
                            type: "string",
                            description: "공공데이터포털에서 발급받은 API 인증키",
                        },
                    },
                    required: ["apiKey"],
                },
            },
        ];
        // MCP 도구 목록 핸들러
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
            return { tools };
        });
        // MCP 도구 호출 핸들러
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case "check_business_number": {
                        const { businessNumber } = args;
                        const result = await this.businessCheckService.checkBusinessNumber(businessNumber);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: JSON.stringify(result, null, 2),
                                },
                            ],
                        };
                    }
                    case "register_api_key": {
                        const { apiKey } = args;
                        this.configService.setApiKey(apiKey);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: "인증키가 성공적으로 등록되었습니다.",
                                },
                            ],
                        };
                    }
                    default:
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: `알 수 없는 도구: ${name}`,
                                },
                            ],
                            isError: true,
                        };
                }
            }
            catch (error) {
                const err = error;
                return {
                    content: [
                        {
                            type: "text",
                            text: `오류: ${err.message}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error("MCP 서버가 시작되었습니다.");
    }
}
exports.MCPService = MCPService;
//# sourceMappingURL=MCPService.js.map