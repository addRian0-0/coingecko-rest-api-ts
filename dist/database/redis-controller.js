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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketChartRangeRedis = exports.saveMarketChartRangeRedis = void 0;
const redis_1 = require("redis");
const saveMarketChartRangeRedis = ({ status, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, redis_1.createClient)();
    client.on("error", (err) => console.error(`Redis client err: ${err}`));
    yield client.connect();
    if (status !== 200) {
        throw new Error(`Error when making the request to coingecko`);
    }
    try {
        data.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
            yield client.set(`${data.name}-market-chart-range-${data.day}-days`, JSON.stringify(data.data));
        }));
    }
    catch (error) {
        throw new Error(`Error saveMarketChartRangeRedis: ${error}`);
    }
    /* days.forEach( async day => {
        await client.set(`${name}-market-chart-range-${day}-days`, JSON.stringify(data));
    }); */
});
exports.saveMarketChartRangeRedis = saveMarketChartRangeRedis;
const getMarketChartRangeRedis = ({ name, days }) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, redis_1.createClient)();
    client.on("error", (err) => console.error(`Redis client err: ${err}`));
    yield client.connect();
    try {
        let array = [];
        days.forEach((day) => __awaiter(void 0, void 0, void 0, function* () {
            const reply = yield client.get(`${name}-market-chart-range-${day}-days`);
            if (reply)
                array.push(reply);
        }));
        if (array.length !== 0) {
            return array;
        }
    }
    catch (error) {
        throw new Error(`Error getMarketChartRangeRedis: ${error}`);
    }
});
exports.getMarketChartRangeRedis = getMarketChartRangeRedis;
