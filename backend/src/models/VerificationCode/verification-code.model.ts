import { Schema } from "mongoose";

const VerificationCodeSchema = new Schema({
    email: {
        required: true,
        type: String,
    },
    code: {
        required: true,
        type: String,
    },
    expiresAt: {
        required: true,
        type: Date,
        index: { expires: 0 }
    }
}, {timestamps: true});

export { VerificationCodeSchema }
