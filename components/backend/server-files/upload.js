
const express = require("express");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const router = express.Router();


// configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure uploads/ folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("resume"), async (req, res) => {
  console.log("File received: ", req.file);
  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path), req.file.originalname);

    const processResponse = await axios.post(
      "http://127.0.0.1:8000/process_resume/",
      form,
      { headers: form.getHeaders() }
    );

    console.log("Response from model:", processResponse);
    

    return res.status(200).json({ message: "File uploaded and processed!", result: processResponse.data });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ error: "Failed to process file." });
  }
});

module.exports = router;