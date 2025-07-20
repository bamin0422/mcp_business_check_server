export declare class ConfigService {
    private configFile;
    constructor(configFile?: string);
    getApiKey(): string | null;
    setApiKey(apiKey: string): void;
    isApiKeyConfigured(): boolean;
    requireApiKey(): string;
}
//# sourceMappingURL=ConfigService.d.ts.map