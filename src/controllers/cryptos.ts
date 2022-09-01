import { Request, Response } from "express";
import { getMarketChartRangeRedis } from "../database/redis-controller";
import { actualizarCryptos } from "../helpers/save-redis";

export const getMarketChartRange = async (req: Request, res: Response) => {

    const { name } = req.params;

    await actualizarCryptos(name);
    const reply = await getMarketChartRangeRedis({ name });

    res.status(200).json({
        msg: `Conseguir historia de precios de ${name}`,
        reply
    });

}