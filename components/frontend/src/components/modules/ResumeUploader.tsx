import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

const ResumeUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Upload successful!");
      } else {
        setUploadStatus("Upload failed!");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("Error connecting to server.");
    }
  };

  return (
    <Paper sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Upload Your Resume
      </Typography>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={{ margin: "1rem 0" }}
      />
      <br />
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {uploadStatus}
      </Typography>
    </Paper>
  );
};

export default ResumeUploader;
