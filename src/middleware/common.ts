import { Request, Response, NextFunction } from "express";

export class CommonMiddleware {
  // CORS 미들웨어 (개발용)
  cors = (req: Request, res: Response, next: NextFunction): void => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  };

  // 로깅 미들웨어
  logging = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  };

  // 404 핸들러
  notFound = (req: Request, res: Response, next: NextFunction): void => {
    const error = new Error(
      `경로를 찾을 수 없습니다: ${req.method} ${req.path}`
    );
    (error as any).statusCode = 404;
    next(error);
  };

  // 전역 에러 핸들링 미들웨어
  errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    console.error("에러 발생:", error);

    const statusCode = (error as any).statusCode || 500;
    const message = error.message || "서버 내부 오류가 발생했습니다.";

    res.status(statusCode).json({
      error: message,
      details: (error as any).details,
      timestamp: new Date().toISOString(),
      path: req.path,
    });
  };
}
