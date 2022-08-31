"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fechas7Dias = void 0;
const fechas7Dias = () => {
    let actual = Date.now(); //Fecha en UNIX
    let dias7 = actual - 1000 * 60 * 60 * 24 * 7;
    let date = new Date(dias7);
    let fechaFormat = date.toLocaleString();
    let anterior = Math.floor(new Date(fechaFormat).getTime() / 1000);
    return { anterior, actual };
};
exports.fechas7Dias = fechas7Dias;
