import express from "express";
import allPosts from "../controllers/post_controller.js";

const routes = app => {
    app.use(express.json());

    app.get("/post", allPosts);

    app.get("/post/:id", (req, res) => {
        res.status(200).send({});
    });
}

export default routes;
