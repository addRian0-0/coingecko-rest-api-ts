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
exports.createUser = exports.saveCrypto = void 0;
const save_redis_1 = require("../helpers/save-redis");
const User_1 = __importDefault(require("../models/User"));
const saveCrypto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_crypto } = req.body;
    /* const newCrypto = await CryptoModel.create({ name: id_crypto }); */
    (0, save_redis_1.actualizarCryptos)();
    res.status(200).json({
        msg: "Se agregó la criptomoneda con éxito.",
        /* newCrypto */
    });
});
exports.saveCrypto = saveCrypto;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const newUser = yield User_1.default.create({ name, password });
    res.status(200).json({
        msg: "Registro de usuario completado.",
        newUser
    });
});
exports.createUser = createUser;
