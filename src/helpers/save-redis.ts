import cron from "node-cron";
import { coingeckoApi } from "../api/coingecko";
import { saveMarketChartRangeRedis } from "../database/redis-controller";
import CryptoModel from "../models/Crypto";
import { ICoinMarketChartRange, GetCoinMarketChartRange } from "../types/Coingecko";
import { fechasDias } from "./set-date-unix";

/* Cuando se guarde una nueva criptomoneda se lanzara para que actualice 
que criptomonedas debe guardar en la media noche */
export const actualizarCryptos = async (name: string) => {

    try {
        //devuelve la fecha actual y la de hace (number) en formato UNIX; asi lo requiere coingecko
        let { anterior, actual } = fechasDias(7);
        let fecha30 = fechasDias(30);
        let fecha90 = fechasDias(90);
        //[, , ,]
        const [res7, res30, res90] = await Promise.all([
            coingeckoApi.get(`coins/${name}/market_chart/range?vs_currency=usd&from=${anterior}&to=${actual}`),
            coingeckoApi.get(`coins/${name}/market_chart/range?vs_currency=usd&from=${fecha30.anterior}&to=${actual}`),
            coingeckoApi.get(`coins/${name}/market_chart/range?vs_currency=usd&from=${fecha90.anterior}&to=${actual}`)
        ]);
        //console.log(res7.data, res30.data, res90.data);
        saveMarketChartRangeRedis({ res7, res30, res90, name });

    } catch (error) {
        console.error(`Error en actualizarCryptos ${error}`);
    }

}

export const actualizarCrytosMedianoche = async () => {
    cron.schedule(" */3 * * * *", async () => {
        //0 0 0 * * *
        const cryptos = await CryptoModel.find();
        cryptos.map(async crypto => {

            // Actualizar para cada 7 dias 
            let { anterior, actual } = fechasDias(7);
            let fecha30 = fechasDias(30);
            let fecha90 = fechasDias(90);
            //[, , ,]
            try {
                const [res7, res30, res90] = await Promise.all([
                    coingeckoApi.get(`coins/${crypto.name}/market_chart/range?vs_currency=usd&from=${anterior}&to=${actual}`),
                    coingeckoApi.get(`coins/${crypto.name}/market_chart/range?vs_currency=usd&from=${fecha30.anterior}&to=${actual}`),
                    coingeckoApi.get(`coins/${crypto.name}/market_chart/range?vs_currency=usd&from=${fecha90.anterior}&to=${actual}`)
                ]);
                saveMarketChartRangeRedis({ res7, res30, res90, name: crypto.name });
            } catch (err) {
                console.error(`Error al actualizacRyptosMedianoche ${crypto.name} ${err}`);
            }



        });

    });
}