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
exports.getMarketChartRange = void 0;
const redis_controller_1 = require("../database/redis-controller");
const save_redis_1 = require("../helpers/save-redis");
const getMarketChartRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    /* Verificar si la informacion esta en redis para contestarla */
    let days = [7];
    let reply = (0, redis_controller_1.getMarketChartRangeRedis)({ name, days });
    if (!reply) {
        (0, save_redis_1.actualizarCryptos)();
    }
    reply = (0, redis_controller_1.getMarketChartRangeRedis)({ name, days });
    res.status(200).json(reply);
});
exports.getMarketChartRange = getMarketChartRange;
