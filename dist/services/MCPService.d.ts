import { BusinessCheckService } from "./BusinessCheckService.js";
import { ConfigService } from "./ConfigService.js";
export declare class MCPService {
    private server;
    private businessCheckService;
    private configService;
    constructor(businessCheckService: BusinessCheckService, configService: ConfigService);
    private setupTools;
    start(): Promise<void>;
}
//# sourceMappingURL=MCPService.d.ts.map