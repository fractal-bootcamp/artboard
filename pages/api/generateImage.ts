import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const oai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const text = req.query.text;
      console.log("text param", text);

      if (text === null || text === undefined) {
        res.status(400).json({ error: "Text is required" });
        return;
      }

      const promptText = Array.isArray(text) ? text.join(" ") : text;
      const response = await oai.images.generate({
        model: "dall-e-3",
        prompt: promptText,
        n: 1,
        size: "1024x1024",
      });
      console.log("from server ", response.data[0].url);
      res.status(200).json(response.data[0].url);
    } catch (error) {
      res.status(500).json({ error: "Error generating image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
// async function getImage() {
//   const response = await oai.images.generate({
//     model: "dall-e-3",
//     prompt: "draw a tictactoe board",
//     n: 1,
//     size: "1024x1024",
//   });
//   console.log(response);
// }
