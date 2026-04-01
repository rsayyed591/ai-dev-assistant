import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const generateAI = async (
  messages,
  model = "llama-3.1-8b-instant"
) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model,
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || error.message;

    console.error("Groq API Error:", errorMessage);

    const apiError = new Error(`AI generation failed: ${errorMessage}`);
    apiError.status = error.response?.status || 500;
    throw apiError;
  }
};