# MCP Business Check Server

[![smithery badge](https://smithery.ai/badge/@bamin0422/mcp_business_check_server)](https://smithery.ai/server/@bamin0422/mcp_business_check_server)

사업자등록번호 진위 및 정보 조회 MCP (Model Context Protocol) 서버입니다.

## 🏗️ 아키텍처

이 프로젝트는 **MVC (Model-View-Controller)** 패턴을 사용하여 구조화되어 있습니다:

```
src/
├── models/          # 데이터 모델 정의
├── services/        # 비즈니스 로직
├── controllers/     # 요청/응답 처리
├── middleware/      # 미들웨어 (인증, 검증, 로깅)
├── routes/          # 라우터 정의
├── utils/           # 유틸리티 함수
└── server.ts        # 메인 애플리케이션
```

## 🚀 기능

### MCP 도구

- **`check_business_number`**: 사업자등록번호 진위 확인 및 정보 조회
- **`register_api_key`**: 공공데이터포털 API 인증키 등록

### REST API 엔드포인트

- `GET /`: API 정보
- `GET /health`: 서버 상태 확인
- `POST /register-key`: 인증키 등록
- `GET /check-business/:bizNumber`: 사업자등록번호 확인

## 📋 요구사항

- Node.js 18+
- pnpm
- 공공데이터포털 API 인증키

## 🛠️ 설치 및 실행

### Installing via Smithery

To install MCP Business Check Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@bamin0422/mcp_business_check_server):

```bash
npx -y @smithery/cli install @bamin0422/mcp_business_check_server --client claude
```

### 로컬 개발

```bash
# 의존성 설치
pnpm install

# TypeScript 빌드
pnpm build

# 개발 모드 실행 (Express + MCP)
pnpm start

# MCP 전용 모드 실행
MCP_SERVER=true pnpm start
```

### Docker 실행

```bash
# Docker 이미지 빌드
docker build -t mcp-business-check-server .

# Docker 컨테이너 실행
docker run -it mcp-business-check-server
```

## 🔧 설정

### 환경 변수

- `PORT`: Express 서버 포트 (기본값: 3000)
- `MCP_SERVER`: MCP 전용 모드 활성화 (true/false)
- `NODE_ENV`: 실행 환경 (development/production)

### 인증키 등록

```bash
# REST API로 등록
curl -X POST http://localhost:3000/register-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-api-key-here"}'

# MCP 도구로 등록
# register_api_key 도구 사용
```

## 🧪 테스트

```bash
# API 정보 확인
curl http://localhost:3000/

# 헬스체크
curl http://localhost:3000/health

# 사업자등록번호 확인
curl http://localhost:3000/check-business/2208102810
```

## 🚀 Smithery AI 배포

이 프로젝트는 [Smithery AI](https://smithery.ai)에서 배포할 수 있도록 구성되어 있습니다.

### 배포 파일

- `Dockerfile`: Docker 컨테이너 빌드 설정
- `smithery.yaml`: Smithery AI 배포 설정
- `.dockerignore`: Docker 빌드 시 제외 파일

### 주요 수정사항

1. **stdout/stderr 분리**: MCP JSON-RPC 프로토콜과 충돌 방지
2. **환경변수 지원**: PORT 환경변수 제대로 처리
3. **MCP 전용 모드**: Express 서버 비활성화 옵션

## 📁 프로젝트 구조

### Models (모델)

- `BusinessInfo.ts`: 사업자 정보 인터페이스
- `Config.ts`: 설정 관련 인터페이스

### Services (서비스)

- `BusinessCheckService.ts`: 사업자등록번호 확인 비즈니스 로직
- `ConfigService.ts`: 설정 관리
- `MCPService.ts`: MCP 서버 관리

### Controllers (컨트롤러)

- `BusinessController.ts`: 사업자 관련 요청 처리
- `ConfigController.ts`: 설정 관련 요청 처리
- `HealthController.ts`: 헬스체크 요청 처리

### Middleware (미들웨어)

- `auth.ts`: 인증 처리
- `validation.ts`: 입력 유효성 검증
- `common.ts`: CORS, 로깅, 에러 처리

### Routes (라우터)

- `business.ts`: 사업자 관련 라우터
- `config.ts`: 설정 관련 라우터
- `health.ts`: 헬스체크 라우터

### Utils (유틸리티)

- `errors.ts`: 커스텀 에러 클래스
- `validators.ts`: 유효성 검증 함수

## 🔍 API 응답 예시

### 사업자등록번호 확인 응답

```json
{
  "isValid": true,
  "businessName": "테스트 기업",
  "ownerName": "홍길동",
  "address": "서울시 강남구",
  "status": "국세청에 등록된 사업자입니다.",
  "raw": {
    "b_no": "2208102810",
    "b_stt": "계속사업자",
    "tax_type": "국세청에 등록된 사업자입니다."
  },
  "timestamp": "2025-07-20T04:13:28.985Z",
  "requestId": "vla2g0r4y"
}
```

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.
