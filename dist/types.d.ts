export interface Config {
    apiKey: string;
}
export interface BusinessInfo {
    b_nm: string;
    b_owner: string;
    address: string;
    tax_type: string;
    [key: string]: any;
}
export interface ApiResponse {
    data: BusinessInfo[];
    [key: string]: any;
}
export interface BusinessCheckResult {
    isValid: boolean;
    businessName: string;
    ownerName: string;
    address: string;
    status: string;
    raw: BusinessInfo;
}
export interface ErrorResponse {
    error: string;
    details?: string;
}
//# sourceMappingURL=types.d.ts.map