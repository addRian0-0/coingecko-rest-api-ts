import cron from "node-cron";
import { coingeckoApi } from "../api/coingecko";
import { saveMarketChartRangeRedis } from "../database/redis-controller";
import CryptoModel from "../models/Crypto";
import { fechasDias } from "./set-date-unix";

/* Cuando se guarde una nueva criptomoneda se lanzara para que actualice 
que criptomonedas debe guardar en la media noche */
export const actualizarCryptos = async (name: string) => {

    try {
        /* exportar  fuera de este archivo la parte de 7, dias y para 30 y 90 */
        //devuelve la fecha actual y la de hace (number) en formato UNIX; asi lo requiere coingecko
        let { anterior, actual } = fechasDias(7);
        let fecha30 = fechasDias(30);
        let fecha90 = fechasDias(90);
        //[, , ,]
        const responses = await Promise.all([
            coingeckoApi.get(`coins/${name}/market_chart/range?vs_currency=usd&from=${anterior}&to=${actual}`),
            coingeckoApi.get(`coins/${name}/market_chart/range?vs_currency=usd&from=${fecha30.anterior}&to=${actual}`),
            coingeckoApi.get(`coins/${name}/market_chart/range?vs_currency=usd&from=${fecha90.anterior}&to=${actual}`)
        ]);

        saveMarketChartRangeRedis(responses);

    } catch (error) {
        console.error(`Error en actualizarCryptos ${error}`);
    }

}

export const actualizarCrytosMedianoche = async () => {
    cron.schedule("0 0 0 * * *", async () => {
        //0 0 0 * * *
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