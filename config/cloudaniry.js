const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect = () => {
    try {
        // Check if required environment variables are defined
        const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
        if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
            throw new Error("Cloudinary environment variables are not properly set");
        }

        // Configure Cloudinary
        cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key: API_KEY,
            api_secret: API_SECRET,
        });

        console.log("Cloudinary successfully connected");

    } catch (err) {
        console.error("Error configuring Cloudinary:", err.message);
    }
};
