import fs from "fs";
import { Config } from "../models/Config.js";
import { AuthenticationError } from "../utils/errors.js";

export class ConfigService {
  private configFile: string;

  constructor(configFile: string = "./config.json") {
    this.configFile = configFile;
  }

  getApiKey(): string | null {
    if (!fs.existsSync(this.configFile)) {
      return null;
    }

    try {
      const data = fs.readFileSync(this.configFile, "utf-8");
      const config: Config = JSON.parse(data);
      return config.apiKey || null;
    } catch (err) {
      console.error("인증키 파일 읽기 오류:", err);
      return null;
    }
  }

  setApiKey(apiKey: string): void {
    try {
      const config: Config = { apiKey };
      fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
    } catch (error) {
      console.error("인증키 저장 오류:", error);
      throw new Error("인증키 저장에 실패했습니다.");
    }
  }

  isApiKeyConfigured(): boolean {
    return this.getApiKey() !== null;
  }

  requireApiKey(): string {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new AuthenticationError(
        "인증키가 등록되어 있지 않습니다. 공공데이터포털에서 인증키를 발급받아 등록해 주세요."
      );
    }
    return apiKey;
  }
}
