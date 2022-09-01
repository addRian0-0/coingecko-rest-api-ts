import { AxiosResponse } from "axios";

export interface MarketChartRangeRedisType {
    res7: AxiosResponse;
    res30: AxiosResponse;
    res90: AxiosResponse;
    name: string;
}

export interface GetMarketChartRangeType {
    name: string;
    //days: number[];
}