const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();

async function generateCaption(base64ImageFile) {
  const contents = [
    { inlineData: { mimeType: "image/jpeg", data: base64ImageFile } },
    { text: "Caption on this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
      you are an expert in generating captions for images. 
      You generate single caption for the image.
      Your caption should be short and concise.
      You use hashtags and emojis in the caption.`,
    },
  });
  // console.log(response.text);
  return response.text;
}

module.exports = generateCaption;
