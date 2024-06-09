import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./userRoute.js";
import transcriptsRoute from "./transcriptsRoute.js";

export const app = express();

app.use(express.json()); 
app.use('/user', userRoute);
app.use('/transcripts', transcriptsRoute);

app.get('/', (req, res) => {
    console.log("User opened site.");
    return res.status(200).send("It works"); 
});

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("App connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB or start the server", error);
    });
