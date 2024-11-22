import fs from "fs";
import { getAllPosts, createPost, findPostById, updatePostById, } from "../models/post.js";
import generateGeminiDescription from "../services/gemini_service.js";

export async function allPosts(req, res) {
    console.log("Retreving all posts...");
    const posts = await getAllPosts();
    res.status(200).send(posts);
}

export async function storePost(req, res) {
    const data = {
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        alt: req.body.alt,
    }

    try {
        console.log("Storing post...");
        const newPost = await createPost(data);
        res.status(200).send(newPost);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function uploadImage(req, res) {
    const data = {
        description: "",
        imageUrl: req.file.originalname,
        alt: ""
    };

    try {
        console.log("Uploading image...");
        const newPost = await createPost(data);

        const updatedImageUrl = `uploads/${newPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImageUrl);
        res.status(200).json(newPost);
    } catch (erro) {
        res.status(500).send(error.message);
    }
}

export async function getPost(req, res) {
    const id = req.params.id;

    try {
        console.log("Retreving post...");
        const post = await findPostById(id);
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const imageUrl = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const aiDescription = await generateGeminiDescription(imgBuffer);

        const post = {
            imageUrl: imageUrl,
            description: aiDescription,
            alt: req.body.alt
        }

        console.log("Updating post...");
        const updatedPost = await updatePostById(id, post);
        res.status(200).json(updatedPost);
    } catch (erro) {
        res.status(500).send(error.message);
    }
}
