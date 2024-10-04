const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
});

require("dotenv").config();

fileSchema.post("save", async (doc) => {
    try {
        console.log("DOC IS ",doc);
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: '"Vraj Jangid" <your-email@example.com>',  // Customize your sender email
            to: doc.email,
            subject: "New File Upload",
            html: `<h1>Hello ${doc.name}</h1>
                <p>File Uploaded. View it here: <a href="https://${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        });

        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
