import redis from "../lib/redis.js";

const WINDOW_IN_SECONDS = 60;
const MAX_REQUESTS = 10;

export default async function ratelimiter(req, res, next) {
  try {
    const identifier = req.user?.id || req.ip;
    const key = `Ratelimit: ${identifier}`;
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, WINDOW_IN_SECONDS);
    }
    if (current > MAX_REQUESTS) {
      return res
        .status(429)
        .json({ error: "Too many requests. Try again later!" });
    }
    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    // Let the request pass through if Redis is down, or handle gracefully
    next();
  }
}
