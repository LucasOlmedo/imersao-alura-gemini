import { MongoClient } from 'mongodb';

export default async function mongodb_connect() {
    let mongoClient;

    let user = process.env.MONGODB_USER;
    let password = encodeURIComponent(process.env.MONGODB_PASSWORD);

    let connection = process.env.MONGODB_URI
        .replace('<db_user>', user)
        .replace('<db_password>', password);

    try {
        mongoClient = new MongoClient(connection);
        await mongoClient.connect();
    } catch (erro) {
        console.error('MongoDB Connection Error', erro);
        process.exit();
    }

    return mongoClient;
}
