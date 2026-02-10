import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { SensorReadingModelModule } from '../models/Statistics/sensor-reading-model.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LightSchema } from '../models/Light/light.model';
import { FanSchema } from '../models/Fan/fan.model';
import { DoorSchema } from '../models/Door/door.model';
import { WaterPumpSchema } from '../models/WaterPump/water-pump.model';

@Module({
    imports: [
        SensorReadingModelModule,
        MongooseModule.forFeature([
            { name: 'Light', schema: LightSchema },
            { name: 'Fan', schema: FanSchema },
            { name: 'Door', schema: DoorSchema },
            { name: 'WaterPump', schema: WaterPumpSchema },
        ]),
    ],
    controllers: [StatisticsController],
    providers: [StatisticsService],
    exports: [StatisticsService],
})
export class StatisticsModule {}
