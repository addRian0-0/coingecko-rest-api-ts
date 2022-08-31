import { prop, Ref, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { User } from "./User";

export class Crypto{

    @prop({ required: true, trim: true, unique: true })
    name: string;   

    @prop({ ref: () => User })
    seguidores: Ref<User>[]

}

const CryptoModel = getModelForClass(Crypto);
export default CryptoModel;