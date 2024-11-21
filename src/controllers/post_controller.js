import fs from "fs";
import { getAllPosts, createPost } from "../models/post.js";

export async function allPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).send(posts);
}

export async function storePost(req, res) {
    const data = req.body;

    try {
        const newPost = await createPost(data);
        res.status(200).send(newPost);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function uploadImage(req, res) {
    const data = {
        description: "req.body.description",
        imageUrl: req.file.originalname,
        alt: "req.body.alt",
    }

    try {
        const newPost = await createPost(data);
        const updatedImageUrl = `uploads/${newPost.insertedId}.jpeg`;
        fs.renameSync(req.file.path, updatedImageUrl);
        res.status(200).send(newPost);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
