import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import { createClient } from "redis";
import { connectDB } from "./database/mongoose-config";
import routerCryptos from "./routes/cryptos";
import { getCoinsMarkets } from "./api/coingecko-methods";

/* Config server */
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/cryptos", routerCryptos);

/* create client Redis */
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

async function main() {
    await client.connect();
    connectDB();
    app.listen(port, () => console.log(`Server listen in port: ${port}`));
}

main();

/* Node cron for request to gecko and save in redis */
cron.schedule('*/10 * * * * *', async () => {
    const { status, data } = await getCoinsMarkets("usd");
    if (status !== 200) {
        throw new Error(`Error when making the request to coingecko`);
    }
    await client.set(`coins-market-usd`, JSON.stringify(data));
});

