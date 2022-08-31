import { Router } from "express";
import { createUser, saveCrypto } from "../controllers/save-in-db";

const routerToDB = Router();

routerToDB.post("/save/crypto", saveCrypto);

routerToDB.post("/save/user", createUser);

export default routerToDB;