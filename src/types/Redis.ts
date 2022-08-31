export interface MarketChartRangeRedisType {
    status: number;
    //name: string;
    data: DataForSaveRangeRedisType[];
    //days: number[];
}

export interface DataForSaveRangeRedisType {
    day: number;
    data: any; 
    name: string;   
}

export interface GetMarketChartRangeType {
    name: string;
    //days: number[];
}