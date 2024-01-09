const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


// Route import 
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const doctorRoute = require("./Routes/doctor");
const reviewRoute = require("./Routes/review");

const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
// console.log(process.env.SECRET_KEY)

const corsOption = {
    origin: true
};


app.get('/', (req, res) => {
    res.send("API is working");
});

mongoose.set('strictQuery', false);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
    }
}



// Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use('/api/v1/auth',authRoute.router);
app.use('/api/v1/users',userRoute.router);
app.use('/api/v1/doctors',doctorRoute.router);
app.use('/api/v1/review',reviewRoute.router);

app.listen(port, () => {
    console.log("Server is running on port " + port);
    connectDB();
});
