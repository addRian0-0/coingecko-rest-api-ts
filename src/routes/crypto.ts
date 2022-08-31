import { Router } from "express";
import { getMarketChartRange } from "../controllers/cryptos";

const routerCrypto = Router();

routerCrypto.get("/coins/range/:name", getMarketChartRange);

export default routerCrypto;