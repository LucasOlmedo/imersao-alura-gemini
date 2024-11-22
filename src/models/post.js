import { ObjectId } from "mongodb";
import mongodb_connect from "../config/mongodb.js";

const mongoClient = await mongodb_connect();

export async function getAllPosts() {
    return await mongoClient
        .db("imersao-alura-gemini")
        .collection("posts")
        .find({})
        .toArray();
}

export async function createPost(data) {
    return await mongoClient
        .db("imersao-alura-gemini")
        .collection("posts")
        .insertOne(data);
}

export async function findPostById(hexId) {
    const id = ObjectId.createFromHexString(hexId);

    return await mongoClient
        .db("imersao-alura-gemini")
        .collection("posts")
        .findOne({ _id: id });
}

export async function updatePostById(hexId, data) {
    const id = ObjectId.createFromHexString(hexId);

    return await mongoClient
        .db("imersao-alura-gemini")
        .collection("posts")
        .updateOne({ _id: id }, { $set: data });
}
