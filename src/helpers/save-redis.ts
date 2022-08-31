import cron from "node-cron";
import { coingeckoApi } from "../api/coingecko";
import { saveMarketChartRangeRedis } from "../database/redis-controller";
import CryptoModel from "../models/Crypto";
import { fechas7Dias } from "./set-date";

/* Cuando se guarde una nueva criptomoneda se lanzara para que actualice 
que criptomonedas debe guardar en la media noche */
export const actualizarCryptos = async (name: string) => {

    /* Actualizar para cada 7 dias */
    let { anterior, actual } = fechas7Dias();
    try {
        let { status, data } = await coingeckoApi.get(
            `coins/${name}/market_chart/range?vs_currency=usd&from=${anterior}&to=${actual}`
        );
        saveMarketChartRangeRedis({ status, data: [{ day: 7, data, name }] });
    } catch (error) {
        console.error(`Error en actualizarCryptos ${error}`);
    }

}

export const actualizarCrytosMedianoche = async () => {
    cron.schedule("0 0 0 * * *", async () => {

        const cryptos = await CryptoModel.find();
        cryptos.map(async crypto => {

            /* Actualizar para cada 7 dias */
            let { anterior, actual } = fechas7Dias();
            try {
                let { status, data } = await coingeckoApi.get(
                    `coins/${crypto.name}/market_chart/range?vs_currency=usd&from=${anterior}&to=${actual}`
                );
                saveMarketChartRangeRedis({ status, data: [{ day: 7, data, name: crypto.name }] });
            } catch (error) {
                console.error(`Error en actualizarCryptosMedianoche ${error}`);
            }

        });

    });
}