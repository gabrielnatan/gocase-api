import { createClient } from "redis";
import { Cache } from "../../../domain/cache/cache.entity.js";

export class RedisCache extends Cache {
  private redisClient;

  constructor() {
    super();
    console.log("process.env.REDIS_URL ",process.env.REDIS_URL)
    this.redisClient = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    this.redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
    this.redisClient.connect();
  }

  async set(key: string, value: object, ttl: number = 3600): Promise<void> {
    const data = JSON.stringify(value);
    await this.redisClient.set(key, data, { EX: ttl });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  async delete(key: string): Promise<boolean> {
    const result = await this.redisClient.del(key);
    return result > 0;
  }
}
