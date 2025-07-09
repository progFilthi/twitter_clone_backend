import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        tweets: true,
        followers: true,
        following: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("getUser error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, name, bio } = req.body;

    const user = await prisma.user.create({
      data: { username, name, bio },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
