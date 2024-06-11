import express from "express";
import { Transcript } from "./transcriptModel.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "./config.js";

const transcriptsRoute = express.Router();

transcriptsRoute.post('/save', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.transcript
        ) {
            return res.status(400).send({message: "All fields are required to save transcript: title, transcript"});
        }

        const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the format: Bearer <token>
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Extract email and display name from decoded token
        const { email, displayName } = decodedToken;


        const newTranscript = {
            title: req.body.title,
            fileName: req.body.fileName,
            transcript: req.body.transcript,
            summary: req.body.summary,
            creator: email
        }
        const transcription = await Transcript.create(newTranscript);

        return res.status(201).send(transcription);
    } catch (error) {
        console.log(error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: "Invalid token" });
        }
        res.status(500).send({ message: error.message });
    }
})

transcriptsRoute.get('/', async (req, res) => {
    try {

        const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the format: Bearer <token>
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const { email } = decodedToken;


        const transcriptID = req.params.id;
        
        const transcript = await Transcript.find({creator: email});

        if (transcript.length === 0) {
            return res.status(404).send({ message: "No reviews found." });
        }
        
        return res.status(200).send(transcript);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

transcriptsRoute.delete('/:id', async (req, res) => {//need to check if the review was created by the user deleting it
    try {

        // Verify JWT token from request headers
        const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the format: Bearer <token>
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const { email} = decodedToken;


        const reviewID = req.params.id;

        const review = await Transcript.findById(reviewID);


        if (review.creator != email) {
            return res.status(403).send({ message: "posterEmail does not match JWT email and user is not admin" });
        }


        const deletedReview = await Transcript.findByIdAndDelete(reviewID);

        if (!deletedReview) {
            return res.status(404).send({ message: "Review not found" })
        }

        return res.status(204).send({ message: "Succesfully deleted record" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
})

export default transcriptsRoute;