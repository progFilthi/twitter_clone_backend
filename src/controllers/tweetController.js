import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Tweet (or Comment if replyToId is present)
export const createTweet = async (req, res) => {
  try {
    const { userId, content, imageUrl, replyToId } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ error: "userId and content are required" });
    }

    const tweet = await prisma.tweet.create({
      data: {
        content,
        imageUrl,
        user: { connect: { id: userId } },
        ...(replyToId && {
          replyTo: { connect: { id: replyToId } },
        }),
      },
    });

    res.status(201).json(tweet);
  } catch (error) {
    console.error("createTweet error:", error);
    res.status(500).json({ error: "Failed to create tweet" });
  }
};

// Get all tweets (public)
export const getTweets = async (req, res) => {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
      where: { replyToId: null }, // top-level tweets only
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
            likes: true,
          },
        },
      },
    });

    res.json(tweets);
  } catch (error) {
    console.error("getTweets error:", error);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
};
