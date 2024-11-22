import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateGeminiDescription(imageBuffer) {
    const prompt = "Generate a short description for this image in less than 50 words";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };

        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text dont available";
    } catch (error) {
        throw new Error(error);
    }
}
