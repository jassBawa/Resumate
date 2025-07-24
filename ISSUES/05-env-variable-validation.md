# ⚠️ [MEDIUM] Missing Environment Variable Validation for OPENAI_ASSISTANT_ID

## **Summary**
The `OPENAI_ASSISTANT_ID` environment variable is cast to string without proper validation, which could cause runtime errors if the variable is undefined.

## **Location**
- **File:** `src/config/config.ts`
- **Line:** 15

## **Current Code**
```typescript
export const ENV_CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_VECTOR_STORE_ID: process.env.OPENAI_VECTOR_STORE_ID,
  BASE_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID as string, // ❌ Unsafe casting
};
```

## **Problem**
The code uses `as string` to cast `process.env.OPENAI_ASSISTANT_ID` without checking if it's actually defined. If this environment variable is missing:

1. **Runtime errors** when the value is used (it will be `undefined`)
2. **Silent failures** that are hard to debug
3. **Inconsistent behavior** compared to other required env vars that have validation
4. **Poor developer experience** with unclear error messages

## **Current Validation Pattern**
The file already validates other required environment variables:
```typescript
if (!process.env.OPENAI_API_KEY) {
  throw Error('OPENAI_API_KEY: OpenAI Key is needed');
}

if (!process.env.OPENAI_VECTOR_STORE_ID) {
  throw Error('OPENAI_VECTOR_STORE_ID: Vector Store id needed');
}
```

## **Impact**
- **Runtime crashes** when OpenAI Assistant functionality is used
- **Inconsistent validation** patterns in the codebase
- **Poor error messages** when the env var is missing
- **Debugging difficulties** due to `undefined` values

## **Proposed Fix**
Add proper validation for `OPENAI_ASSISTANT_ID`:

```typescript
if (!process.env.OPENAI_API_KEY) {
  throw Error('OPENAI_API_KEY: OpenAI Key is needed');
}

if (!process.env.OPENAI_VECTOR_STORE_ID) {
  throw Error('OPENAI_VECTOR_STORE_ID: Vector Store id needed');
}

if (!process.env.OPENAI_ASSISTANT_ID) {
  throw Error('OPENAI_ASSISTANT_ID: Assistant ID is required');
}

export const ENV_CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_VECTOR_STORE_ID: process.env.OPENAI_VECTOR_STORE_ID,
  BASE_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID,
};
```

## **Alternative Approaches**

### Option 1: Inline validation
```typescript
OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID || (() => {
  throw new Error('OPENAI_ASSISTANT_ID: Assistant ID is required');
})(),
```

### Option 2: Using a validation library (like zod)
```typescript
import { z } from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  OPENAI_VECTOR_STORE_ID: z.string(),
  OPENAI_ASSISTANT_ID: z.string(),
  DATABASE_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().optional(),
});

const env = envSchema.parse(process.env);
```

## **Steps to Reproduce**
1. Remove `OPENAI_ASSISTANT_ID` from environment variables
2. Start the application
3. Try to use chat functionality
4. Observe runtime errors or undefined behavior

## **Additional Context**
This follows the principle of "fail fast" - it's better to catch missing environment variables at startup rather than during runtime when users are trying to use the feature.

---
**Labels:** `bug`, `medium`, `environment`, `validation`, `configuration`