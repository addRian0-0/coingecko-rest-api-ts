import { Request, Response } from "express"
import { actualizarCryptos } from "../helpers/save-redis";
import CryptoModel from "../models/Crypto";
import UserModel from "../models/User";

export const saveCrypto = async (req: Request, res: Response) => {

    const { id_crypto } = req.body;

    const newCrypto = await CryptoModel.create({ name: id_crypto });
    actualizarCryptos(name: id_crypto);

    res.status(200).json({
        msg: "Se agregó la criptomoneda con éxito.",
        newCrypto
    });

}

export const createUser = async (req: Request, res: Response) => {

    const { name, password } = req.body;

    const newUser = await UserModel.create({ name, password });

    res.status(200).json({
        msg: "Registro de usuario completado.",
        newUser
    });

}