import { Module } from '@nestjs/common';
import { EnvironmentGateway } from './environment.gateway';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
    imports: [StatisticsModule],
    providers: [EnvironmentGateway],
})
export class EnvironmentModule {}
