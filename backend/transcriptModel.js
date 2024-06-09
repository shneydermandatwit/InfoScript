import mongoose from "mongoose";

const transcriptSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        transcript: {
            type: String,
            required: true
        },

        creator: {
            type: String,
            required: true
        }
    }
)

export const Transcript = mongoose.model('transcripts', transcriptSchema);