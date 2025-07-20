import axios from "axios";
import {
  BusinessCheckResult,
  BusinessInfo,
  ApiResponse,
} from "../models/BusinessInfo.js";
import { ConfigService } from "./ConfigService.js";
import { NotFoundError, ApiError } from "../utils/errors.js";
import { validateBusinessNumber } from "../utils/validators.js";

export class BusinessCheckService {
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  async checkBusinessNumber(bizNumber: string): Promise<BusinessCheckResult> {
    // 입력 유효성 검증
    validateBusinessNumber(bizNumber);

    // API 키 가져오기
    const apiKey = this.configService.requireApiKey();

    // 공공데이터포털 API 호출 (POST 방식, body에 b_no 배열 전달)
    const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${encodeURIComponent(
      apiKey
    )}`;

    let data: ApiResponse;
    try {
      const response = await axios.post(
        url,
        { b_no: [bizNumber] },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10초 타임아웃
        }
      );
      data = response.data;

      // API 응답 검증
      if (!data || !data.data || data.data.length === 0) {
        throw new NotFoundError("등록된 사업자가 없습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API 응답 에러:", error.response?.data);

        if (error.code === "ECONNABORTED") {
          throw new ApiError("API 요청 시간 초과", 408);
        }

        if (error.response?.status === 401) {
          throw new ApiError("인증키가 유효하지 않습니다.", 401);
        }

        throw new ApiError(
          `API 호출 실패: ${
            error.response?.status || "UNKNOWN"
          } - ${JSON.stringify(error.response?.data || error.message)}`,
          error.response?.status || 500
        );
      }
      throw error;
    }

    // 진위 체크 및 사업자 정보 리턴
    const bizInfo: BusinessInfo = data.data[0];

    return {
      isValid: bizInfo.tax_type === "국세청에 등록된 사업자입니다.",
      businessName: bizInfo.b_nm || "정보 없음",
      ownerName: bizInfo.b_owner || "정보 없음",
      address: bizInfo.b_addr || "정보 없음",
      status: bizInfo.tax_type || "정보 없음",
      raw: bizInfo,
    };
  }
}
