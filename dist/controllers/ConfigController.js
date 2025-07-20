"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigController = void 0;
class ConfigController {
    constructor(configService) {
        this.registerApiKey = (req, res, next) => {
            try {
                const { apiKey } = req.body;
                this.configService.setApiKey(apiKey);
                res.json({
                    message: "인증키가 성공적으로 등록되었습니다.",
                    timestamp: new Date().toISOString(),
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.configService = configService;
    }
}
exports.ConfigController = ConfigController;
//# sourceMappingURL=ConfigController.js.map