"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const save_in_db_1 = require("../controllers/save-in-db");
const routerToDB = (0, express_1.Router)();
routerToDB.post("/save/crypto", save_in_db_1.saveCrypto);
routerToDB.post("/save/user", save_in_db_1.createUser);
exports.default = routerToDB;
