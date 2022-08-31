export interface MarketChartRangeRedisType {
    responses: AxiosResponse[];
}

export interface AxiosResponse<T = never> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    request?: any;
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