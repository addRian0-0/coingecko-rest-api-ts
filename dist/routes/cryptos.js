"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptos_1 = require("../controllers/cryptos");
const routerCryptos = (0, express_1.Router)();
routerCryptos.get("/", cryptos_1.getCryptos);
exports.default = routerCryptos;
