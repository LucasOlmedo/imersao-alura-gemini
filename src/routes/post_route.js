import express from "express";
import multer from "multer";
import cors from "cors";
import { allPosts, getPost, storePost, uploadImage, updatePost } from "../controllers/post_controller.js";

// Windows
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const upload = multer({dest: "./uploads"});

const routes = app => {
    app.use(express.json());

    app.use(cors(corsOptions));

    app.get("/post", allPosts);

    app.post("/post", storePost);

    app.post("/upload", upload.single("image"), uploadImage);

    app.get("/post/:id", getPost);

    app.put("/post/:id", updatePost);
}

export default routes;
