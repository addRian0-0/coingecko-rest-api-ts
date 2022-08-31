import { Request, Response } from "express";
import { createClient } from "redis";
import { getMarketChartRangeRedis } from "../database/redis-controller";

export const getMarketChartRange = async (req: Request, res: Response) => {

    const { name } = req.params;

    const reply = await getMarketChartRangeRedis({ name });

    res.status(200).json({
        msg: `Conseguir historia de precios de ${name}`,
        reply
    });

}