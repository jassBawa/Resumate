import { ENV_CONFIG } from "@/config/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: ENV_CONFIG.OPENAI_API_KEY,
});

export default openai;