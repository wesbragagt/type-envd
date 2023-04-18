# Type Envd

Create a typescript definition from your project's .env files. By listing all .env files and merging the unique variable names available, generating a type definition in `src/generated.env.d.ts`

## Getting Started

`npx type-envd`

or

`npm install type-envd -D`

## How?

It will analyze your project wherever you execute the command below, gathering all .env related files, merging all the unique key variables and generating a src/generated.env.d.ts file

Creating a file that looks like

```typescript
export type EnvKeys = "DATABASE_URL" | "SQS_QUEUE_URL" | "TEST_KEY" | "APP_ENV" | "TEST_API_KEY" | "TEST_SECRET" | "API_URL" | "SDK_KEY"; 

export type Envs = { [K in EnvKeys]?: string };
```

## Usecase Examples

### Type process.env

```typescript
import { Envs } from './generated.env.d.ts'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Envs {}
  }
}
```

## License

MIT
