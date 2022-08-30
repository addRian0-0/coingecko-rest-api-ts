import { ResponseType } from "axios";
import { coingeckoApi } from "./coingecko"

/* GET TO https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd */
export const getCoinsMarkets = async (vs_currency: string) => {

    const result = await coingeckoApi.get(`coins/markets?vs_currency=${vs_currency}`);
    let { status, data } = result;
    /* console.log(status, data); */
    return { status, data };

}