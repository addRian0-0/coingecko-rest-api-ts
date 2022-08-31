"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptos_1 = require("../controllers/cryptos");
const routerCrypto = (0, express_1.Router)();
routerCrypto.get("/coins/range/:name", cryptos_1.getMarketChartRange);
exports.default = routerCrypto;
