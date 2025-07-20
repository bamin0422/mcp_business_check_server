export interface BusinessInfo {
    b_no: string;
    b_nm?: string;
    b_owner?: string;
    b_addr?: string;
    b_stt: string;
    b_stt_cd: string;
    tax_type: string;
    tax_type_cd: string;
    end_dt: string;
    utcc_yn: string;
    tax_type_change_dt: string;
    invoice_apply_dt: string;
    rbf_tax_type: string;
    rbf_tax_type_cd: string;
    [key: string]: any;
}
export interface BusinessCheckResult {
    isValid: boolean;
    businessName: string;
    ownerName: string;
    address: string;
    status: string;
    raw: BusinessInfo;
    timestamp?: string;
    requestId?: string;
}
export interface ApiResponse {
    data: BusinessInfo[];
    [key: string]: any;
}
export interface ErrorResponse {
    error: string;
    details?: string;
    timestamp?: string;
    path?: string;
}
//# sourceMappingURL=BusinessInfo.d.ts.map