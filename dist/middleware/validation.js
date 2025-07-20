"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const validators_js_1 = require("../utils/validators.js");
class ValidationMiddleware {
    constructor() {
        this.validateBusinessNumber = (req, res, next) => {
            try {
                const { bizNumber } = req.params;
                (0, validators_js_1.validateBusinessNumber)(bizNumber);
                next();
            }
            catch (error) {
                next(error);
            }
        };
        this.validateApiKeyBody = (req, res, next) => {
            try {
                const { apiKey } = req.body;
                (0, validators_js_1.validateApiKey)(apiKey);
                next();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.js.map