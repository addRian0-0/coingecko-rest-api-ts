import { prop, getModelForClass } from "@typegoose/typegoose";

export class User{

    @prop({ required: true, trim: true, unique: true })
    name: string;

    @prop({ trim: true })
    email: string;

    @prop({ required: true, trim: true })
    password: string;

}

const UserModel = getModelForClass(User);
export default UserModel;