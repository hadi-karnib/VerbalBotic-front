import axios from "axios";

const getAdvice = async (question) => {
  const apiKey = process.env.CHATGPT_API;
  const model = process.env.CHAT_MODEL || "text-davinci-003";

  const url = "https://api.openai.com/v1/completions";

  try {
    const response = await axios.post(
      url,
      {
        model: model,
        prompt: question,
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

    const advice = response.data.choices[0].text.trim();
    return advice;
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Sorry, I couldn't fetch advice at the moment.";
  }
};

export default getAdvice;
