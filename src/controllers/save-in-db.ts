import { Request, Response } from "express"
import { actualizarCryptos } from "../helpers/save-redis";
import CryptoModel from "../models/Crypto";
import UserModel from "../models/User";

export const saveCrypto = async (req: Request, res: Response) => {

    const { id_crypto } = req.body;

    const crypto = await CryptoModel.findOne({ name: id_crypto });
    actualizarCryptos(id_crypto);
    if (!crypto) {
        const newCrypto = await CryptoModel.create({ name: id_crypto });
        actualizarCryptos(id_crypto);

        return res.status(200).json({
            msg: "Se agregó la criptomoneda con éxito.",
            newCrypto
        });
    }

    return res.status(400).json({
        msg: `Ya estaba esa madre: ${id_crypto}`,
        crypto
    })


}

export const createUser = async (req: Request, res: Response) => {

    const { name, password } = req.body;

    const newUser = await UserModel.create({ name, password });

    res.status(200).json({
        msg: "Registro de usuario completado.",
        newUser
    });

}