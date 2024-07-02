import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { clerkIdentifier, text, voice, pitch, rate, volume } = req.body;

    try {
      const u = await prisma.user.findUnique({
        where: {
          clerkID: clerkIdentifier,
        },
      });

      if (u === null) {
        res.status(400).json({ error: "User not found" });
      }

      const newPost = await prisma.post.create({
        data: {
          userId: u!.id,
          userName: u!.name,
          text: text,
          voice: voice,
          pitch: pitch,
          rate: rate,
          volume: volume,
        },
      });

      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Error creating post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
