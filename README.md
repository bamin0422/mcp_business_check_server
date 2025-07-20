# MCP 사업자등록번호 진위 확인 서버

공공데이터포털 API를 사용하여 사업자등록번호의 진위를 확인하고 사업자 정보를 조회하는 MCP(Model Context Protocol) 서버입니다.

## 기능

- 사업자등록번호 진위 확인
- 사업자 정보 조회 (상호명, 대표자명, 주소 등)
- MCP 프로토콜을 통한 도구 제공
- REST API 엔드포인트 제공

## 설치 및 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. TypeScript 빌드

```bash
pnpm build
```

### 3. 서버 실행

```bash
# 개발 모드 (TypeScript 직접 실행)
pnpm dev

# 프로덕션 모드 (빌드된 JavaScript 실행)
pnpm start
```

## API 키 등록

공공데이터포털(https://www.data.go.kr/)에서 사업자등록번호 진위 확인 API 인증키를 발급받아 등록해야 합니다.

### REST API를 통한 등록

```bash
curl -X POST http://localhost:3000/register-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-api-key-here"}'
```

### MCP 도구를 통한 등록

MCP 클라이언트에서 `register_api_key` 도구를 사용하여 등록할 수 있습니다.

## 사용법

### REST API

#### 사업자등록번호 확인

```bash
curl http://localhost:3000/check-business/1234567890
```

응답 예시:

```json
{
  "isValid": true,
  "businessName": "예시회사",
  "ownerName": "홍길동",
  "address": "서울특별시 강남구...",
  "status": "등록된 사업자",
  "raw": { ... }
}
```

### MCP 도구

#### 1. check_business_number

사업자등록번호의 진위를 확인하고 사업자 정보를 조회합니다.

**매개변수:**

- `businessNumber` (string): 확인할 사업자등록번호 (10자리 숫자, 하이픈 제외)

**사용 예시:**

```json
{
  "name": "check_business_number",
  "arguments": {
    "businessNumber": "1234567890"
  }
}
```

#### 2. register_api_key

공공데이터포털 API 인증키를 등록합니다.

**매개변수:**

- `apiKey` (string): 공공데이터포털에서 발급받은 API 인증키

**사용 예시:**

```json
{
  "name": "register_api_key",
  "arguments": {
    "apiKey": "your-api-key-here"
  }
}
```

## 개발

### 개발 모드 실행

```bash
pnpm dev
```

### TypeScript 컴파일 감시

```bash
pnpm watch
```

### 빌드

```bash
pnpm build
```

## 파일 구조

```
├── src/
│   ├── server.ts      # 메인 서버 파일 (Express + MCP)
│   └── types.ts       # TypeScript 타입 정의
├── dist/              # 빌드된 JavaScript 파일
├── package.json       # 프로젝트 설정
├── tsconfig.json      # TypeScript 설정
└── README.md          # 프로젝트 문서
```

## 주의사항

- 사업자등록번호는 하이픈(-) 없이 10자리 숫자로 입력해야 합니다.
- API 키는 `config.json` 파일에 저장되므로 보안에 주의하세요.
- 공공데이터포털 API의 일일 호출 한도를 확인하세요.

## 라이선스

MIT License
