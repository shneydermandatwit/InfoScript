export interface Transcript {
        _id: string;
        title: string;
        fileName: string;
        transcript: string;
        summary?: string; // Optional property
        createdAt: string; // Assuming this is a date string
}
