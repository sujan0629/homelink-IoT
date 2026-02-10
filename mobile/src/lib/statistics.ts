import api from './axios';
import type { InsightsData, DailyStats } from '@shared/src/types/Statistics/Statistics';

export const statisticsApi = {
    async getInsights(): Promise<InsightsData> {
        const response = await api.get('/statistics/insights');
        return response.data;
    },

    async getDailyStats(): Promise<DailyStats> {
        const response = await api.get('/statistics/daily');
        return response.data;
    },
};
