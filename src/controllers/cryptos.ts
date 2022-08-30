import { Request, Response } from "express";
import { createClient } from "redis";
import { getCoinsMarkets } from "../api/coingecko-methods";

/* Pa cuando listen todas las monedas csm */
export const getCryptos = async (req: Request, res: Response) => {

    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    const { vs_currency } = req.params;

    try {

        const reply = await client.get(`coins-market-${vs_currency}`);
        if (reply) return res.status(200).json(JSON.parse(reply));

        /* if vs_currency is different to usd => */
        const { status, data } = await getCoinsMarkets(vs_currency);
        if (status !== 200) {
            throw new Error(`Error when making the request to coingecko`);
        }
        await client.set(`coins-market-${vs_currency}`, JSON.stringify(data));
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Ocurrio un error"
        });
    }

}