import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { SensorReading, InsightsData, DailyStats, DeviceUsageStats, EnvironmentHistory } from 'shared/src/types/Statistics/Statistics';
import type { TLight } from 'shared/src/types/Light/Light';
import type { TFan } from 'shared/src/types/Fan/Fan';
import type { TDoor } from 'shared/src/types/Door/Door';
import type { TWaterPump } from 'shared/src/types/WaterPump/WaterPump';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectModel('SensorReading') private sensorReadingModel: Model<SensorReading>,
        @InjectModel('Light') private lightModel: Model<TLight>,
        @InjectModel('Fan') private fanModel: Model<TFan>,
        @InjectModel('Door') private doorModel: Model<TDoor>,
        @InjectModel('WaterPump') private waterPumpModel: Model<TWaterPump>,
    ) {}

    async saveSensorReading(data: SensorReading): Promise<void> {
        await this.sensorReadingModel.create(data);
    }

    async getInsightsData(): Promise<InsightsData> {
        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

        // Get current device states
        const [light, fan, door, waterPump] = await Promise.all([
            this.lightModel.findOne(),
            this.fanModel.findOne(),
            this.doorModel.findOne(),
            this.waterPumpModel.findOne(),
        ]);

        const activeDevices = [
            light?.isOn,
            fan?.isOn,
            door?.isOn,
            waterPump?.isOn,
        ].filter(Boolean).length;

        // Get recent sensor readings for averages
        const recentReadings = await this.sensorReadingModel
            .find({ timestamp: { $gte: oneDayAgo } })
            .sort({ timestamp: -1 })
            .limit(100)
            .lean();

        const avgTemperature = recentReadings.length > 0
            ? recentReadings.reduce((sum, r) => sum + r.temperature, 0) / recentReadings.length
            : 0;

        const avgHumidity = recentReadings.length > 0
            ? recentReadings.reduce((sum, r) => sum + r.humidity, 0) / recentReadings.length
            : 0;

        // Get weekly energy usage (last 7 days)
        const weeklyEnergyUsage = await this.getWeeklyEnergyUsage();

        // Calculate energy saved (compared to baseline/previous week)
        const energySaved = await this.calculateEnergySaved();

        // Get device usage stats
        const deviceUsage = await this.getDeviceUsageStats();

        // Get environment history (last 24 hours, sampled every 4 hours)
        const environmentHistory = await this.getEnvironmentHistory(oneDayAgo, now);

        return {
            activeDevices,
            energySaved,
            avgTemperature: Math.round(avgTemperature * 10) / 10,
            avgHumidity: Math.round(avgHumidity * 10) / 10,
            weeklyEnergyUsage,
            deviceUsage,
            environmentHistory,
        };
    }

    async getDailyStats(): Promise<DailyStats> {
        const now = Date.now();
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const startOfDayTimestamp = startOfDay.getTime();

        // Get today's sensor readings
        const todayReadings = await this.sensorReadingModel
            .find({ timestamp: { $gte: startOfDayTimestamp } })
            .sort({ timestamp: 1 })
            .lean();

        if (todayReadings.length === 0) {
            // Return default values if no data
            return {
                date: new Date().toISOString().split('T')[0],
                energyUsage: 0,
                temperature: { high: 0, low: 0, average: 0 },
                humidity: { high: 0, low: 0, average: 0 },
                activeDevices: 0,
            };
        }

        // Calculate temperature stats
        const temperatures = todayReadings.map(r => r.temperature);
        const tempHigh = Math.max(...temperatures);
        const tempLow = Math.min(...temperatures);
        const tempAvg = temperatures.reduce((sum, t) => sum + t, 0) / temperatures.length;
        
        const tempHighReading = todayReadings.find(r => r.temperature === tempHigh);
        const tempLowReading = todayReadings.find(r => r.temperature === tempLow);

        // Calculate humidity stats
        const humidities = todayReadings.map(r => r.humidity);
        const humHigh = Math.max(...humidities);
        const humLow = Math.min(...humidities);
        const humAvg = humidities.reduce((sum, h) => sum + h, 0) / humidities.length;

        const humHighReading = todayReadings.find(r => r.humidity === humHigh);
        const humLowReading = todayReadings.find(r => r.humidity === humLow);

        // Get current active devices
        const [light, fan, door, waterPump] = await Promise.all([
            this.lightModel.findOne(),
            this.fanModel.findOne(),
            this.doorModel.findOne(),
            this.waterPumpModel.findOne(),
        ]);

        const activeDevices = [
            light?.isOn,
            fan?.isOn,
            door?.isOn,
            waterPump?.isOn,
        ].filter(Boolean).length;

        // Calculate today's energy usage
        const energyUsage = await this.calculateDailyEnergyUsage(startOfDayTimestamp);

        return {
            date: new Date().toISOString().split('T')[0],
            energyUsage: Math.round(energyUsage * 100) / 100,
            temperature: {
                high: Math.round(tempHigh * 10) / 10,
                low: Math.round(tempLow * 10) / 10,
                average: Math.round(tempAvg * 10) / 10,
                highTime: tempHighReading ? this.formatTime(tempHighReading.timestamp) : undefined,
                lowTime: tempLowReading ? this.formatTime(tempLowReading.timestamp) : undefined,
            },
            humidity: {
                high: Math.round(humHigh * 10) / 10,
                low: Math.round(humLow * 10) / 10,
                average: Math.round(humAvg * 10) / 10,
                highTime: humHighReading ? this.formatTime(humHighReading.timestamp) : undefined,
                lowTime: humLowReading ? this.formatTime(humLowReading.timestamp) : undefined,
            },
            activeDevices,
        };
    }

    private async getWeeklyEnergyUsage(): Promise<number[]> {
        const energyByDay: number[] = [];
        const now = Date.now();

        for (let i = 6; i >= 0; i--) {
            const dayStart = now - i * 24 * 60 * 60 * 1000;
            const dayEnd = dayStart + 24 * 60 * 60 * 1000;
            
            const energy = await this.calculateDailyEnergyUsage(dayStart);
            energyByDay.push(Math.round(energy * 10) / 10);
        }

        return energyByDay;
    }

    private async calculateDailyEnergyUsage(dayStart: number): Promise<number> {
        // Estimate based on device power consumption and usage
        // This is a simplified calculation
        const [light, fan] = await Promise.all([
            this.lightModel.findOne(),
            this.fanModel.findOne(),
        ]);

        // Calculate hours of operation (simplified)
        // In real scenario, you'd track state changes over time
        const lightPower = (light?.power || 0) / 1000; // Convert to kW
        const fanPower = (fan?.power || 0) / 1000; // Convert to kW

        // Estimate 8-12 hours of usage per day (random variation)
        const usageHours = 8 + Math.random() * 4;
        
        return (lightPower + fanPower) * usageHours;
    }

    private async calculateEnergySaved(): Promise<number> {
        // Calculate energy saved compared to baseline
        // This is a simplified calculation - you could compare with previous periods
        const currentWeekEnergy = await this.getWeeklyEnergyUsage();
        const totalEnergy = currentWeekEnergy.reduce((sum, e) => sum + e, 0);
        
        // Assume baseline is 20% higher
        const baseline = totalEnergy * 1.2;
        const saved = ((baseline - totalEnergy) / baseline) * 100;
        
        return Math.max(0, Math.round(saved));
    }

    private async getDeviceUsageStats(): Promise<DeviceUsageStats[]> {
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

        // In a real scenario, you'd track device state changes
        // For now, we'll estimate based on current state
        const [light, fan, door, waterPump] = await Promise.all([
            this.lightModel.findOne(),
            this.fanModel.findOne(),
            this.doorModel.findOne(),
            this.waterPumpModel.findOne(),
        ]);

        const stats: DeviceUsageStats[] = [];

        if (light) {
            const hours = light.isOn ? 40 + Math.random() * 20 : 30 + Math.random() * 15;
            stats.push({
                deviceType: 'light',
                totalHours: Math.round(hours),
                energyConsumption: (light.power / 1000) * hours,
            });
        }

        if (fan) {
            const hours = fan.isOn ? 50 + Math.random() * 20 : 35 + Math.random() * 15;
            stats.push({
                deviceType: 'fan',
                totalHours: Math.round(hours),
                energyConsumption: (fan.power / 1000) * hours,
            });
        }

        if (door) {
            const hours = 10 + Math.random() * 10;
            stats.push({
                deviceType: 'door',
                totalHours: Math.round(hours),
                energyConsumption: 0.5 * hours, // Small motor
            });
        }

        if (waterPump) {
            const hours = 20 + Math.random() * 15;
            stats.push({
                deviceType: 'waterPump',
                totalHours: Math.round(hours),
                energyConsumption: 1.5 * hours,
            });
        }

        return stats;
    }

    private async getEnvironmentHistory(startTime: number, endTime: number): Promise<EnvironmentHistory[]> {
        // Get readings sampled every 4 hours for the last 24 hours
        const intervals = 6; // 24 hours / 4 hours = 6 intervals
        const history: EnvironmentHistory[] = [];

        for (let i = 0; i < intervals; i++) {
            const time = startTime + (i * 4 * 60 * 60 * 1000);
            const nextTime = time + (4 * 60 * 60 * 1000);

            const reading = await this.sensorReadingModel
                .findOne({
                    timestamp: { $gte: time, $lt: nextTime }
                })
                .sort({ timestamp: 1 })
                .lean();

            if (reading) {
                history.push({
                    timestamp: reading.timestamp,
                    temperature: Math.round(reading.temperature * 10) / 10,
                    humidity: Math.round(reading.humidity * 10) / 10,
                });
            }
        }

        return history;
    }

    private formatTime(timestamp: number): string {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
}
