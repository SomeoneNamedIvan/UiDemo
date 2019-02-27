import mongoose from "mongoose";
import connectToDb from "../db/connect";

const {Schema} = mongoose;
const purpose = new Schema({
    name: String,
});

const Purpose = connectToDb.mainDB.model("Purpose", purpose, "purposes");
export default Purpose;