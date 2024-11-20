import mongodb_connect from "../config/mongodb.js";

const mongoClient = await mongodb_connect();

export default async function getAllPosts() {
    return await mongoClient
        .db("imersao-alura-gemini")
        .collection("posts")
        .find({})
        .toArray();
}
