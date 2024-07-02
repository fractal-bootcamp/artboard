//given a post id, return the number of likes
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const postId = req.query.id;

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(postId as string),
        },
      });

      if (post === null) {
        res.status(400).json({ error: "Post not found" });
      }

      if (post) {
        const likeCount = await prisma.like.count({
          where: {
            postId: post.id,
          },
        });
        res.status(200).json(likeCount);
      }
    } catch (error) {
      res.status(500).json({ error: "Error creating post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
