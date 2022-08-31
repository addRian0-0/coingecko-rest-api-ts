import cron from "node-cron";
import { coingeckoApi } from "../api/coingecko";
import CryptoModel from "../models/Crypto";
import { fechas7Dias } from "./set-date";

/* Cuando se guarde una nueva criptomoneda se lanzara para que actualice 
que criptomonedas debe guardar en la media noche */
export const actualizarCryptos = () => {
    //0 0 0 * * *
    cron.schedule("*/10 * * * * *", async () => {

        const cryptos = await CryptoModel.find();
        /* Actualizar para cada 7 dias */
        cryptos.map(async crypto => {

            let { anterior, actual } = fechas7Dias();
            
            const res = await coingeckoApi.get(
                `coins/${crypto.name}/market_chart/range?vs_currency=usd&from=${anterior}&to=${actual}`
            );

            console.log(res.status, res.data);

        });

    });

}