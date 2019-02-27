import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Card from "./components/card";
import Purpose from "./components/purpose";
import moment from "moment-timezone";


const app = express();

app.use(cors());

const router = express.Router();
router.use(bodyParser.json());

router.route("/genCards")
    .post(genCards);

router.route("/getCards")
    .get(getCards);


app.use("/v1", router);
app.listen("9005", function () {
    console.log("Listening on port 9005.");
});

async function getCards(req, res) {
    try {
        const response = await Card.find({})
            .populate({path: "purposes", model: Purpose, lean: true})
            .lean();
        return res.json(response);
    } catch (err) {
        return res.status(400).send(err);
    }
}

async function genCards(req, res) {
    try {
        const {name, estimatedCost, predictedCost, addDay} = req.body;
        const purposes = await Purpose.find({}).distinct("_id");
        const start = moment().tz("Asia/Kuala_Lumpur").startOf('day').toDate();
        const end = moment().tz("Asia/Kuala_Lumpur").startOf('day').add(addDay, 'd').toDate();
        const newCard = await new Card({
            name,
            startDate: start,
            endDate: end,
            purposes,
            estimatedCost,
            predictedCost,
        }).save();
        return res.json(newCard);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
}