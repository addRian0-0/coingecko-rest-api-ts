import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/mongoose-config";
import routerToDB from "./routes/manipulate-db";
import routerCrypto from "./routes/crypto";

/* Config server */
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

connectDB();
app.listen(port, () => console.log(`Listen in port: ${port}...`));

/* Routes */
app.use("/db", routerToDB);
app.use("/crypto", routerCrypto);