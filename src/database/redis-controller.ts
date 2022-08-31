import { createClient } from "redis";
import { GetMarketChartRangeType, MarketChartRangeRedisType } from "../types/Redis";

export const saveMarketChartRangeRedis = async (responses: MarketChartRangeRedisType) => {

    const client = createClient();
    client.on("error", (err) => console.error(`Redis client err: ${err}`));
    await client.connect();

    if (status !== 200) {
        throw new Error(`Error when making the request to coingecko`);
    }

    try {
        data.forEach(async data => {
            await client.set(`${data.name}-market-chart-range-${data.day}-days`, JSON.stringify(data.data));
        });
    } catch (error) {
        throw new Error(`Error saveMarketChartRangeRedis: ${error}`);
    }

}

export const getMarketChartRangeRedis = async ({ name }: GetMarketChartRangeType) => {

    const client = createClient();
    client.on("error", (err) => console.error(`Redis client err: ${err}`));
    await client.connect();

    try {

        const [seven] = await Promise.all([
            client.get(`${name}-market-chart-range-7-days`),
        ]);
        if(seven !== null){
            return JSON.parse(seven);
        }

    } catch (error) {
        throw new Error(`Error getMarketChartRangeRedis: ${error}`);
    }

}