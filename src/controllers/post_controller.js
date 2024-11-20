import getAllPosts from "../models/post.js";

export default async function allPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).send(posts);
}
