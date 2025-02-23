export abstract class Cache {
    abstract set(key: string, value: object, ttl?: number): Promise<void>;
    abstract get<T>(key: string): Promise<T | null>;
    abstract delete(key: string): Promise<boolean>;
  }
  