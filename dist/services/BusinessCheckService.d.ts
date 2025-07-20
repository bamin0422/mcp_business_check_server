import { BusinessCheckResult } from "../models/BusinessInfo.js";
import { ConfigService } from "./ConfigService.js";
export declare class BusinessCheckService {
    private configService;
    constructor(configService: ConfigService);
    checkBusinessNumber(bizNumber: string): Promise<BusinessCheckResult>;
}
//# sourceMappingURL=BusinessCheckService.d.ts.map