//given a  user and post, check if the user has liked the post
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
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

      //return true if the user has liked the post
      if (user && post) {
        const like = await prisma.like.findFirst({
          where: {
            userId: user.id,
            postId: post.id,
          },
        });
        res.status(200).json(like !== null);
      }
    } catch (error) {
      res.status(500).json({ error: "Error checking if user has liked post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
