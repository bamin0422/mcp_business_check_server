import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { BusinessCheckService } from "./BusinessCheckService.js";
import { ConfigService } from "./ConfigService.js";

export class MCPService {
  private server: Server;
  private businessCheckService: BusinessCheckService;
  private configService: ConfigService;

  constructor(
    businessCheckService: BusinessCheckService,
    configService: ConfigService
  ) {
    this.businessCheckService = businessCheckService;
    this.configService = configService;

    this.server = new Server({
      name: "business-check-server",
      version: "1.0.0",
    });

    this.setupTools();
  }

  private setupTools(): void {
    // MCP 도구 정의
    const tools: Tool[] = [
      {
        name: "check_business_number",
        description:
          "사업자등록번호의 진위를 확인하고 사업자 정보를 조회합니다.",
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
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools };
    });

    // MCP 도구 호출 핸들러
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "check_business_number": {
            const { businessNumber } = args as { businessNumber: string };
            const result = await this.businessCheckService.checkBusinessNumber(
              businessNumber
            );
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
            const { apiKey } = args as { apiKey: string };
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
      } catch (error) {
        const err = error as Error;
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

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.log("MCP 서버가 시작되었습니다.");
  }
}
