const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


// routes
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const voteRoute = require("./routes/voteRoute");
const candidateRoute = require("./routes/candidateRoute");
const userRoute = require("./routes/userRoute");

// middleware
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();

// connect database
connectDB();

// middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://voter-wheat.vercel.app",
        "https://my-first-back-end-work.onrender.com"
    ],

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

//  home route
app.get("/", (req, res) => {
    res.send("Online Voting API Running...");
});


//  API ROUTES
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/votes", voteRoute);
app.use("/api/candidates", candidateRoute);
app.use("/api/users", userRoute);

//  error middleware (MUST be last)
app.use(errorHandler);


// start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});