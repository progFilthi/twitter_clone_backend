import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTimeline = async (req, res) => {
  const userId = req.params.id;

  try {
    // Get all users this user follows
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followedIds = following.map((f) => f.followingId);

    // Include user’s own tweets too
    followedIds.push(userId);

    const tweets = await prisma.tweet.findMany({
      where: { userId: { in: followedIds } },
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        likes: true,
      },
    });

    res.json(tweets);
  } catch (error) {
    console.error("getTimeline error:", error);
    res.status(500).json({ error: "Failed to fetch timeline" });
  }
};
