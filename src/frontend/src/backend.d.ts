import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StationData {
    pH: ParameterReading;
    turbidity: ParameterReading;
    temperature: ParameterReading;
    name: string;
    locationDescription: string;
    ecoli: ParameterReading;
    flowRate: ParameterReading;
    nitrates: ParameterReading;
    dissolvedOxygen: ParameterReading;
    macroinvertebrateIndex: ParameterReading;
    coordinates: Coordinates;
}
export interface ParameterReading {
    historicalTrend: Array<number>;
    unit: string;
    currentValue: number;
}
export type Coordinates = [number, number];
export interface backendInterface {
    getAllStations(): Promise<Array<StationData>>;
    getStationReadings(stationName: string): Promise<StationData>;
}
