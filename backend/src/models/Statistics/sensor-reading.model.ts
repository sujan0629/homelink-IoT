import { Schema } from "mongoose";
import type { SensorReading } from "shared/src/types/Statistics/Statistics";

const SensorReadingSchema = new Schema<SensorReading>({
    temperature: {
        required: true,
        type: Number
    },
    humidity: {
        required: true,
        type: Number
    },
    timestamp: {
        required: true,
        type: Number,
        index: true
    }
}, { 
    timestamps: true,
    collection: 'sensor_readings'
});

// Index for efficient querying by timestamp
SensorReadingSchema.index({ timestamp: -1 });

export { SensorReadingSchema };
