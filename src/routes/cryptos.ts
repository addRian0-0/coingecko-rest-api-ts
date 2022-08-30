import { Router } from "express";
import { getCryptos } from "../controllers/cryptos";

const routerCryptos = Router();

routerCryptos.get("/:vs_currency", getCryptos);

export default routerCryptos;