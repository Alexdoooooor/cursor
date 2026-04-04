import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/cinecraft-control-room";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export function isDatabaseEnabled(): boolean {
  return !(
    process.env.SKIP_DB_CONNECT === "true" ||
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "production"
  );
}

export async function connectToDatabase() {
  if (!isDatabaseEnabled()) {
    return mongoose;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.warn(
      "MongoDB недоступна, используется встроенный демо-слой данных.",
      error instanceof Error ? error.message : error,
    );
    return mongoose;
  }

  return cached.conn;
}
