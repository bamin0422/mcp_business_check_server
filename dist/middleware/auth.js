"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
class AuthMiddleware {
    constructor(configService) {
        this.checkApiKey = (req, res, next) => {
            try {
                const apiKey = this.configService.requireApiKey();
                req.apiKey = apiKey;
                next();
            }
            catch (error) {
                next(error);
            }
        };
        this.configService = configService;
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.js.map