import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        const db = await mongoose.connect("mongodb://localhost/cryptodatabase")
        console.log(`Database is connected to: ${db.connection.db.databaseName}...`);
    } catch (error) {
        console.error(`Error to connect database: ${error}...`);
    }

}