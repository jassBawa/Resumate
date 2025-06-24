if (!process.env.OPENAI_API_KEY) {
  throw Error('OPENAI_API_KEY: OpenAI Key is needed');
}

if (!process.env.OPENAI_VECTOR_STORE_ID) {
  throw Error('OPENAI_VECTOR_STORE_ID: Vector Store id needed');
}

export const ENV_CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_VECTOR_STORE_ID: process.env.OPENAI_VECTOR_STORE_ID,
  BASE_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID as string,
};
