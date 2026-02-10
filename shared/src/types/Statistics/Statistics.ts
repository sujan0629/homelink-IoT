export interface SensorReading {
    temperature: number;
    humidity: number;
    timestamp: number;
}

export interface DeviceUsageStats {
    deviceType: 'light' | 'fan' | 'door' | 'waterPump';
    totalHours: number;
    energyConsumption: number;
}

export interface DailyStats {
    date: string;
    energyUsage: number; // kWh
    temperature: {
        high: number;
        low: number;
        average: number;
        highTime?: string;
        lowTime?: string;
    };
    humidity: {
        high: number;
        low: number;
        average: number;
        highTime?: string;
        lowTime?: string;
    };
    activeDevices: number;
}

export interface EnvironmentHistory {
    timestamp: number;
    temperature: number;
    humidity: number;
}

export interface InsightsData {
    activeDevices: number;
    energySaved: number;
    avgTemperature: number;
    avgHumidity: number;
    weeklyEnergyUsage: number[];
    deviceUsage: DeviceUsageStats[];
    environmentHistory: EnvironmentHistory[];
}
