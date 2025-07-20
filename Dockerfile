# Node.js 18 Alpine 이미지 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./

# pnpm 설치
RUN npm install -g pnpm

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# TypeScript 빌드
RUN pnpm build

# MCP 서버 모드로 실행
ENV MCP_SERVER=true
ENV NODE_ENV=production

# 포트 노출 (선택사항, MCP는 stdio 사용)
EXPOSE 3000

# MCP 서버 실행
CMD ["node", "dist/server.js"] 