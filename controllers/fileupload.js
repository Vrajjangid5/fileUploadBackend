const File = require("../models/files");
const path = require("path")
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.localFileUpload = (req, res) => {
    try {
        // Accessing the uploaded file
        const file = req.files.file;
        console.log("File: ", file);

        // Creating the directory if it doesn't exist
        const uploadDir = path.join(__dirname, "/files/");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Defining the file path where the file will be saved
        let filePath = path.join(uploadDir, Date.now() + `.${file.name.split('.')[1]}`);

        // Moving the file to the specified path
        file.mv(filePath, (err) => {
            if (err) {
                console.log("Error: ", err);
                return res.status(500).json({
                    success: false,
                    message: "File upload failed",
                    error: err,
                });
            }

            // Success response
            res.json({
                success: true,
                message: "Local file uploaded successfully",
            });
        });
    } catch (error) {
        console.error("Error in file upload: ", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
function isFileSupp(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { 
        folder, 
        timeout: 60000 // Set timeout to 60 seconds
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Check if file exists
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const file = req.files.imageFile;
        console.log(file);

        // Supported file types
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();  // Fixing file type check

        if (!isFileSupp(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        // Upload file to Cloudinary
        const response = await uploadFileToCloudinary(file, "vrajjangid");
        console.log(response);

        const imageUrl = response.secure_url;

        // DB entry can go here (currently commented out)
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:imageUrl,
        })

        res.json({
            success: true,
            message: "Image successfully uploaded",
            imageUrl: imageUrl,  // Send the URL back in the response
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


function isFileSupp(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadVideoToCloudinary(file, folder) {
    const options = { 
        folder, 
        resource_type: "video"  // Specify that this is a video upload
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Check if file exists
        if (!req.files || !req.files.videoFile) {
            return res.status(400).json({
                success: false,
                message: "No video uploaded",
            });
        }

        const file = req.files.videoFile;
        console.log(file);

        // Supported video file types
        const supportedTypes = ["mp4", "mov", "avi", "mkv"];
        const fileType = file.name.split('.').pop().toLowerCase();  // Get file extension

        if (!isFileSupp(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "Video format not supported",
            });
        }

        // Upload video to Cloudinary
        const response = await uploadVideoToCloudinary(file, "vrajjangid/videos");
        console.log(response);

        const videoUrl = response.secure_url;

        // DB entry can go here (currently commented out)
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:videoUrl
        });

        res.json({
            success: true,
            message: "Video successfully uploaded",
            videoUrl: videoUrl,  // Send the video URL back in the response
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong during video upload",
        });
    }
};
