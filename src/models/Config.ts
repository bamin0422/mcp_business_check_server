export interface Config {
  apiKey: string;
}

export interface ServerConfig {
  port: number;
  environment: string;
  configFile: string;
}

export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  memory: NodeJS.MemoryUsage;
}

export interface ApiInfo {
  name: string;
  version: string;
  description: string;
  endpoints: Record<string, string>;
  timestamp: string;
}
