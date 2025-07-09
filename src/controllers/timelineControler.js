import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTimeline = async (req, res) => {
  const userId = req.params.id;

  try {
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followedIds = following.map((f) => f.followingId);
    followedIds.push(userId); // include own tweets

    const timeline = await prisma.tweet.findMany({
      where: {
        userId: { in: followedIds },
        replyToId: null, // exclude replies in main feed
      },
      orderBy: { createdAt: "desc" },
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

    res.json(timeline);
  } catch (error) {
    console.error("getTimeline error:", error);
    res.status(500).json({ error: "Failed to fetch timeline" });
  }
};
