import cron from "node-cron";
import { coingeckoApi } from "../api/coingecko";
import { saveMarketChartRangeRedis } from "../database/redis-controller";
import CryptoModel from "../models/Crypto";
import { fechasDias } from "./set-date-unix";

/* Cuando se guarde una nueva criptomoneda se lanzara para que actualice 
que criptomonedas debe guardar en la media noche */
export const actualizarCryptos = async (name: string) => {

    /* exportar  fuera de este archivo la parte de 7, dias y para 30 y 90 */
    /* Actualizar para cada 7 dias */
    let { anterior, actual } = fechasDias(7);
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
            let { anterior, actual } = fechasDias(7);
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