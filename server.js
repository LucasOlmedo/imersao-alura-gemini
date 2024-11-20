import express from "express";

const app = express();

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/books", (req, res) => {
    res.status(200).send([
        { name: "Pride and Prejudice", author: "Jane Austen" },
        { name: "The Lord of the Rings", author: "J. R. R. Tolkien" },
        { name: "The Hobbit", author: "J. R. R. Tolkien" },
    ]);    
});
