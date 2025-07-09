import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTweet = async (req, res) => {
  try {
    const { userId, content, imageUrl } = req.body;

    const tweet = await prisma.tweet.create({
      data: {
        content,
        imageUrl,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(tweet);
  } catch (error) {
    console.error("createTweet error:", error);
    res.status(500).json({ error: "Failed to create tweet" });
  }
};

export const getTweets = async (req, res) => {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true, likes: true },
    });

    res.json(tweets);
  } catch (error) {
    console.error("getTweets error:", error);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
};
