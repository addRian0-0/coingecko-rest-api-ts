"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const mongoose_config_1 = require("./database/mongoose-config");
const cryptos_1 = __importDefault(require("./routes/cryptos"));
const redis_config_1 = require("./database/redis-config");
const save_data_redis_1 = require("./helpers/save-data-redis");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
/* Connect DB's */
const clientRedis = (0, redis_config_1.connectRedis)();
(0, mongoose_config_1.connectDB)();
app.use(express_1.default.json());
/* Routes */
app.use("/cryptos", cryptos_1.default);
/* Node cron for request to gecko and save in redis */
node_cron_1.default.schedule('*/10 * * * * *', save_data_redis_1.saveCoinsMarkets);
app.listen(port, () => {
    console.log(`Listen server in port: ${port}...`);
});
