import mongoose from "mongoose";

const transcriptSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },

        transcript: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: false
        },

        creator: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Transcript = mongoose.model('transcripts', transcriptSchema);