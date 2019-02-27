import Mongoose from "mongoose";

Mongoose.Promise = global.Promise;

const dbUrl = "mongodb://avanade-demo:qwer1234@ds135917.mlab.com:35917/avanade-demo?authSource=avanade-demo";

const mainDB = createConnection(dbUrl);

function createConnection(dbURL) {
    // Database connect options
    const options = {
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 5000,
        keepAlive: 1,
        connectTimeoutMS: 45000,
        socketTimeoutMS: 60000,
        autoReconnect: true
    };

    try {
        let db = Mongoose.createConnection(dbURL, options);
        db.on('error', function (err) {
            console.error(new Date(), String(err));
        });

        db.once('open', function () {
            console.log(new Date(), "Mongoose connected to " + dbURL);
        });

        Mongoose.set('useCreateIndex', true);

        return db;
    } catch (err) {
        console.warn("Could not connect to MongoDB");
    }
}

const dbConnections = {
    mainDB: mainDB
};

export default dbConnections;