import { ValidationError } from "./errors.js";

export function validateBusinessNumber(bizNumber: string): void {
  if (!bizNumber) {
    throw new ValidationError("사업자등록번호가 필요합니다.");
  }

  // 사업자등록번호 형식 체크 (숫자 10자리, 하이픈 없는 형태)
  if (!/^\d{10}$/.test(bizNumber)) {
    throw new ValidationError(
      "사업자등록번호 형식이 올바르지 않습니다. 10자리 숫자만 입력하세요."
    );
  }
}

export function validateApiKey(apiKey: string): void {
  if (!apiKey) {
    throw new ValidationError("apiKey가 필요합니다.");
  }

  if (typeof apiKey !== "string" || apiKey.trim().length === 0) {
    throw new ValidationError("유효한 apiKey를 입력해주세요.");
  }
}

export function generateRequestId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}
