import express from "express";
import { ConfigService } from "./services/ConfigService.js";
import { BusinessCheckService } from "./services/BusinessCheckService.js";
import { MCPService } from "./services/MCPService.js";
import { BusinessController } from "./controllers/BusinessController.js";
import { ConfigController } from "./controllers/ConfigController.js";
import { HealthController } from "./controllers/HealthController.js";
import { AuthMiddleware } from "./middleware/auth.js";
import { ValidationMiddleware } from "./middleware/validation.js";
import { CommonMiddleware } from "./middleware/common.js";
import { createBusinessRouter } from "./routes/business.js";
import { createConfigRouter } from "./routes/config.js";
import { createHealthRouter } from "./routes/health.js";

class App {
  private app: express.Application;
  private port: number;
  private configService: ConfigService;
  private businessCheckService: BusinessCheckService;
  private mcpService: MCPService;

  constructor() {
    this.port = parseInt(process.env.PORT || "3000");
    this.app = express();

    // 서비스 초기화
    this.configService = new ConfigService();
    this.businessCheckService = new BusinessCheckService(this.configService);
    this.mcpService = new MCPService(
      this.businessCheckService,
      this.configService
    );

    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    const commonMiddleware = new CommonMiddleware();

    // 기본 미들웨어
    this.app.use(express.json({ limit: "1mb" }));
    this.app.use(express.urlencoded({ extended: true }));

    // 공통 미들웨어
    this.app.use(commonMiddleware.cors);
    this.app.use(commonMiddleware.logging);
  }

  private setupRoutes(): void {
    // 컨트롤러 초기화
    const businessController = new BusinessController(
      this.businessCheckService
    );
    const configController = new ConfigController(this.configService);
    const healthController = new HealthController();

    // 미들웨어 초기화
    const authMiddleware = new AuthMiddleware(this.configService);
    const validationMiddleware = new ValidationMiddleware();

    // 라우터 생성
    const businessRouter = createBusinessRouter(
      businessController,
      authMiddleware,
      validationMiddleware
    );
    const configRouter = createConfigRouter(
      configController,
      validationMiddleware
    );
    const healthRouter = createHealthRouter(healthController);

    // 라우터 적용
    this.app.use("/", healthRouter);
    this.app.use("/", businessRouter);
    this.app.use("/", configRouter);
  }

  private setupErrorHandling(): void {
    const commonMiddleware = new CommonMiddleware();

    // 404 핸들러
    this.app.use(commonMiddleware.notFound);

    // 전역 에러 핸들러
    this.app.use(commonMiddleware.errorHandler);
  }

  async start(): Promise<void> {
    try {
      // Express 서버 시작
      this.app.listen(this.port, () => {
        console.log(
          `Express 서버가 http://localhost:${this.port} 에서 실행 중입니다.`
        );
        console.log(`환경: ${process.env.NODE_ENV || "development"}`);
      });

      // MCP 서버 시작
      await this.mcpService.start();
    } catch (error) {
      console.error("서버 시작 실패:", error);
      process.exit(1);
    }
  }
}

// 프로세스 종료 핸들러
process.on("SIGTERM", () => {
  console.log("SIGTERM 신호를 받았습니다. 서버를 종료합니다.");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT 신호를 받았습니다. 서버를 종료합니다.");
  process.exit(0);
});

// 서버 시작
const app = new App();
app.start().catch(console.error);
