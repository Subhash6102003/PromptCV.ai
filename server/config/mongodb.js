import { MongoClient, GridFSBucket } from 'mongodb';

let client;
let db;
let bucket;

export const connectToMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const dbName = process.env.MONGODB_DB_NAME || 'ai_resume_builder';
    
    client = new MongoClient(mongoUri);
    await client.connect();
    
    db = client.db(dbName);
    bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    
    console.log('Connected to MongoDB successfully');
    return { client, db, bucket };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectToMongoDB first.');
  }
  return db;
};

export const getBucket = () => {
  if (!bucket) {
    throw new Error('GridFS bucket not initialized. Call connectToMongoDB first.');
  }
  return bucket;
};

export const closeConnection = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};
