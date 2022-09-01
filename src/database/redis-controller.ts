import { createClient } from "redis";
import { GetMarketChartRangeType, MarketChartRangeRedisType } from "../types/Redis";

export const saveMarketChartRangeRedis = async ({ res7, res30, res90, name }: MarketChartRangeRedisType) => {

    const client = createClient();
    client.on("error", (err) => console.error(`Redis client err: ${err}`));
    await client.connect();

    /* Para 7 dias */
    try {
        res7.status === 200 ?
            await client.set(`${name}-market-chart-range-7-days`, JSON.stringify(res7.data.prices)) : ""
        res30.status === 200 ?
            await client.set(`${name}-market-chart-range-30-days`, JSON.stringify(res30.data.prices)) : ""
        res90.status === 200 ?
            await client.set(`${name}-market-chart-range-90-days`, JSON.stringify(res90.data.prices)) : ""
    } catch (error) {
        console.error(`Error in save in redis: ${error}`)
    }

}

export const getMarketChartRangeRedis = async ({ name }: GetMarketChartRangeType) => {

    const client = createClient();
    client.on("error", (err) => console.error(`Redis client err: ${err}`));
    await client.connect();

    try {

        const [seven, thirty, ninety] = await Promise.all([
            client.get(`${name}-market-chart-range-30-days`),
            client.get(`${name}-market-chart-range-7-days`),
            client.get(`${name}-market-chart-range-90-days`),
        ]);
        if (seven !== null && ninety !== null && thirty !== null) {
            let days7 = await JSON.parse(seven)
            let days30 = await JSON.parse(thirty)
            let days90 = await JSON.parse(ninety)
            return { days7, days30, days90 };
        }

    } catch (error) {
        throw new Error(`Error getMarketChartRangeRedis: ${error}`);
    }

}