"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonMiddleware = void 0;
class CommonMiddleware {
    constructor() {
        // CORS 미들웨어 (개발용)
        this.cors = (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            if (req.method === "OPTIONS") {
                res.sendStatus(200);
                return;
            }
            next();
        };
        // 로깅 미들웨어
        this.logging = (req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
            next();
        };
        // 404 핸들러
        this.notFound = (req, res, next) => {
            const error = new Error(`경로를 찾을 수 없습니다: ${req.method} ${req.path}`);
            error.statusCode = 404;
            next(error);
        };
        // 전역 에러 핸들링 미들웨어
        this.errorHandler = (error, req, res, next) => {
            console.error("에러 발생:", error);
            const statusCode = error.statusCode || 500;
            const message = error.message || "서버 내부 오류가 발생했습니다.";
            res.status(statusCode).json({
                error: message,
                details: error.details,
                timestamp: new Date().toISOString(),
                path: req.path,
            });
        };
    }
}
exports.CommonMiddleware = CommonMiddleware;
//# sourceMappingURL=common.js.map