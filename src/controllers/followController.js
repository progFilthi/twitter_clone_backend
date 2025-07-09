import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const followUser = async (req, res) => {
  try {
    const followingId = req.params.id;
    const { followerId } = req.body;

    const follow = await prisma.follow.create({
      data: { followerId, followingId },
    });

    res.status(201).json(follow);
  } catch (error) {
    console.error("followUser error:", error);
    res.status(500).json({ error: "Failed to follow user" });
  }
};
