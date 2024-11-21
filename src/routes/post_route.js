import express from "express";
import multer from "multer";
import { allPosts, storePost, uploadImage } from "../controllers/post_controller.js";

// Windows
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({
    dest: "./uploads",
    // storage: storage,
});

const routes = app => {
    app.use(express.json());

    app.get("/post", allPosts);

    app.post("/post", storePost);

    app.post("/upload", upload.single("image"), uploadImage);

    app.get("/post/:id", (req, res) => {
        res.status(200).send({});
    });
}

export default routes;
