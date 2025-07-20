import { Request, Response } from "express";
import { HealthStatus, ApiInfo } from "../models/Config.js";

export class HealthController {
  getHealth = (req: Request, res: Response): void => {
    const healthStatus: HealthStatus = {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };

    res.json(healthStatus);
  };

  getApiInfo = (req: Request, res: Response): void => {
    const apiInfo: ApiInfo = {
      name: "MCP Business Check Server",
      version: "1.0.0",
      description: "사업자등록번호 진위 및 정보 조회 MCP 서버",
      endpoints: {
        "POST /register-key": "인증키 등록",
        "GET /check-business/:bizNumber": "사업자등록번호 진위 확인",
        "GET /health": "서버 상태 확인",
      },
      timestamp: new Date().toISOString(),
    };

    res.json(apiInfo);
  };
}
