"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarCryptos = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const coingecko_1 = require("../api/coingecko");
const redis_controller_1 = require("../database/redis-controller");
const Crypto_1 = __importDefault(require("../models/Crypto"));
const set_date_1 = require("./set-date");
/* Cuando se guarde una nueva criptomoneda se lanzara para que actualice
que criptomonedas debe guardar en la media noche */
const actualizarCryptos = () => __awaiter(void 0, void 0, void 0, function* () {
    //0 0 0 * * *
    node_cron_1.default.schedule("*/10 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        const cryptos = yield Crypto_1.default.find();
        cryptos.map((crypto) => __awaiter(void 0, void 0, void 0, function* () {
            /* Actualizar para cada 7 dias */
            let { anterior, actual } = (0, set_date_1.fechas7Dias)();
            let { status, data } = yield coingecko_1.coingeckoApi.get(`coins/${crypto.name}/market_chart/range?vs_currency=usd&from=${anterior}&to=${actual}`);
            (0, redis_controller_1.saveMarketChartRangeRedis)({ status, data: [{ day: 7, data, name: crypto.name }] });
        }));
    }));
});
exports.actualizarCryptos = actualizarCryptos;
