import mongoose from "mongoose";
import connectToDb from "../db/connect";

const {Schema} = mongoose;
const card = new Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    purposes: [{
        type: Schema.Types.ObjectId,
        ref: 'Purpose',
    }],
    estimatedCost: Number,
    predictedCost: Number

}, {
    timestamps: true,

});

const Card = connectToDb.mainDB.model("Card", card, "cards");
export default Card;