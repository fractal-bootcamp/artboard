import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { clerkIdentifier, fullName } = req.body;
    console.log("ran user api");
    console.log(clerkIdentifier);
    console.log(fullName);

    try {
      const newUser = await prisma.user.upsert({
        where: { clerkID: clerkIdentifier },
        update: { clerkID: clerkIdentifier, name: fullName },
        create: { clerkID: clerkIdentifier, name: fullName },
      });

      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creating/updating user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
