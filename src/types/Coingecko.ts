export interface ICoinMarketChartRange {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

export interface GetCoinMarketChartRange{
    data: ICoinMarketChartRange;
}