
export {};
type EnvKeys = "DATABASE_URL" | "SQS_QUEUE_URL" | "KEY" | "APP_ENV"; 

declare global {
  namespace NodeJS {
    interface ProcessEnv { 
      [K in EnvKeys]?: string 
    }
  }
}
