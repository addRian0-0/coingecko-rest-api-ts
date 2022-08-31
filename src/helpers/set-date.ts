import { SetFechas } from "../types/SetFechas";

export const fechas7Dias = (): SetFechas => {

    let actual = Date.now(); //Fecha en UNIX
    let dias7 = actual - 1000 * 60 * 60 * 24 * 7; 

    let date = new Date(dias7);
    let fechaFormat = date.toLocaleString();
    let anterior = Math.floor(new Date(fechaFormat).getTime() / 1000);

    return { anterior, actual };

}