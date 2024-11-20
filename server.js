import express from "express";
import routes from "./src/routes/post_route.js";

const app = express();

routes(app);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
