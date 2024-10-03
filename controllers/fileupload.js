const File = require("../models/files");
const path = require("path");
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
