import axios from "axios";
import { CHATGPT_API, CHAT_MODEL } from "@env";
const getAdvice = async (question) => {
  const apiKey = CHATGPT_API;
  const model = CHAT_MODEL || "gpt-3.5-turbo";

  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await axios.post(
      url,
      {
        model: model,
        messages: [{ role: "user", content: question }],
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const advice = response.data.choices[0].message.content.trim();
    return advice;
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Sorry, I couldn't fetch advice at the moment.";
  }
};

export default getAdvice;
