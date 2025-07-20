"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessController = void 0;
const validators_js_1 = require("../utils/validators.js");
class BusinessController {
    constructor(businessCheckService) {
        this.checkBusiness = async (req, res, next) => {
            try {
                const { bizNumber } = req.params;
                const result = await this.businessCheckService.checkBusinessNumber(bizNumber);
                res.json({
                    ...result,
                    timestamp: new Date().toISOString(),
                    requestId: (0, validators_js_1.generateRequestId)(),
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.businessCheckService = businessCheckService;
    }
}
exports.BusinessController = BusinessController;
//# sourceMappingURL=BusinessController.js.map