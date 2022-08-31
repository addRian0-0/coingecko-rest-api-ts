"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_config_1 = require("./database/mongoose-config");
const manipulate_db_1 = __importDefault(require("./routes/manipulate-db"));
const crypto_1 = __importDefault(require("./routes/crypto"));
/* Config server */
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
(0, mongoose_config_1.connectDB)();
app.listen(port, () => console.log(`Listen in port: ${port}...`));
/* Routes */
app.use("/db", manipulate_db_1.default);
app.use("/crypto", crypto_1.default);
