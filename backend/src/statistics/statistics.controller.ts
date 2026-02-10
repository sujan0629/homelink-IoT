import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get('insights')
    async getInsights() {
        return this.statisticsService.getInsightsData();
    }

    @Get('daily')
    async getDailyStats() {
        return this.statisticsService.getDailyStats();
    }
}
