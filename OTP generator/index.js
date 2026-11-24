
const express = require("express");
const { createClient } = require("redis");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

app.use(express.json());

const OTP_SECRET = process.env.OTP_SECRET;

const redis = createClient({
    url: "redis://localhost:6379"
});

redis.on("error", (err) => {
    console.log("Redis error:", err);
});

async function start() {

    await redis.connect();

    console.log("Connected to Redis successfully");

    // GENERATE OTP
    app.post("/generate-otp", async (req, res) => {

        const otp = crypto.randomInt(100000, 1000000).toString();

        const hashedotp = crypto
            .createHmac("sha256", OTP_SECRET)
            .update(otp)
            .digest("hex");

        await redis.set("otp", hashedotp, {
            EX: 60
        });

        // Reset previous attempts
        await redis.del("otp:attempts");

        res.json({
            message: "OTP generated and stored in Redis",
            otp: otp
        });
    });

    // VERIFY OTP
    app.post("/verify-otp", async (req, res) => {

        const { otp } = req.body;

        const result = await redis.get("otp");

        if (!result) {
            return res.status(400).json({
                message: "Invalid or expired OTP"
            });
        }

        const hashedOTP = crypto
            .createHmac("sha256", OTP_SECRET)
            .update(otp)
            .digest("hex");

        // Correct OTP
        if (hashedOTP === result) {

            await redis.del("otp");
            await redis.del("otp:attempts");

            return res.json({
                message: "OTP verified successfully"
            });
        }

        // Incorrect OTP
        const attempts = await redis.incr("otp:attempts");

        if (attempts === 1) {
            await redis.expire("otp:attempts", 60);
        }

        if (attempts >= 5) {
            return res.status(429).json({
                message: "Too many attempts. Generate a new OTP."
            });
        }

        return res.status(400).json({
            message: "Invalid OTP"
        });
    });
    /*
        const otp = crypto.randomInt(1000000, 10000000).toString()
        console.log("generated otp:", otp)
     
     
        const hashaedOTP = crypto
            .createHmac("sha256", OTP_SECRET)
            .update(otp)
            .digest("hex")
     
     
        await redis.set("HashedOTP", hashaedOTP, {
            EX: 60
        })
        console.log("hashed otp stored in redis with expiration of 60 seconds")
     
        const result = await redis.get("HashedOTP")
        console.log("retrieved otp from redis:", result)
     
        const remianingTime = await redis.ttl("HashedOTP")
        console.log("remaining time for otp to expire:", remianingTime, "seconds")
     
    */
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}



start()





