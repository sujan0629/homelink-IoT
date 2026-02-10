import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SensorReadingSchema } from "./sensor-reading.model";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'SensorReading', schema: SensorReadingSchema }
        ])
    ],
    exports: [MongooseModule]
})
export class SensorReadingModelModule {}
