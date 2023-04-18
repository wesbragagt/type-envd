export type EnvKeys = "DATABASE_URL" | "API_KEY" | "SDK_KEY"; 
export type Envs = { [K in EnvKeys]?: string };