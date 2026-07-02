const dns = require("dns");

// Force public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("DNS servers:", dns.getServers());

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;