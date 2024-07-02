import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("reached add like function");
    const { clerkIdentifier, postId } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          clerkID: clerkIdentifier,
        },
      });

      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (user === null) {
        res.status(400).json({ error: "User not found" });
      }

      if (post === null) {
        res.status(400).json({ error: "Post not found" });
      }

      //remove like
      if (user && post) {
        const like = await prisma.like.delete({
          where: {
            userId_postId: {
              userId: user.id,
              postId: post.id,
            },
          },
        });
        res.status(200).json(like);
      }
    } catch (error) {
      res.status(500).json({ error: "Error removing like" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
