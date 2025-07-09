import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const likeTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { userId } = req.body;

    const like = await prisma.like.create({
      data: { userId, tweetId },
    });

    res.status(201).json(like);
  } catch (error) {
    console.error("likeTweet error:", error);
    res.status(500).json({ error: "Failed to like tweet" });
  }
};
