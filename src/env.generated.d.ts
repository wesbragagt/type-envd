export type EnvKeys = "DATABASE_URL"|"SQS_QUEUE_URL"|"TEST_KEY"|"APP_ENV"|"TEST_API_KEY"|"TEST_SECRET"|"API_URL"|"SDK_KEY"; 
export type Envs = { [K in EnvKeys]?: string };