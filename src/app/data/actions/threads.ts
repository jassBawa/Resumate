"use server";

import openai from "@/lib/openai";


export async function getOpenAIResponse(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content || "No response";
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "Error processing request";
  }
}
