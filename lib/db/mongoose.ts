// lib/db/mongoose.ts
import mongoose from "mongoose";

function getMongoUri(): string {
  const v = process.env.MONGODB_URI;
  if (!v || typeof v !== "string" || v.trim().length === 0) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }
  return v;
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as { __mongooseCache?: MongooseCache };
const cache: MongooseCache = globalForMongoose.__mongooseCache ?? { conn: null, promise: null };
globalForMongoose.__mongooseCache = cache;

export async function dbConnect(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    const uri = getMongoUri();
    cache.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((m) => m);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

// ✅ alias for agent/auth code
export const connectMongoose = dbConnect;
