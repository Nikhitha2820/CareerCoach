import React, { useState, useCallback } from "react";
import { Box, Typography, Paper } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDropzone } from "react-dropzone";

const ResumeUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [processResult, setProcessResult] = useState<string>("");

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus("Upload successful!");
        console.log("Response from model:", data);
        // Show the result from the backend (process_resume)
        if (data.result && data.result.summary_answer) {
          setProcessResult(data.result.summary_answer);
        } else if (data.processResult && data.processResult.message) {
          setProcessResult(data.processResult.message);
        } else {
          setProcessResult("No processing result received.");
        }
      } else {
        setUploadStatus("Upload failed!");
        setProcessResult("");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("Error connecting to server.");
      setProcessResult("");
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    setSelectedFile(file);
    if (file) {
      handleUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
    },
    multiple: false,
    maxFiles: 1,
  });

  return (
    <Box sx={{ width: '80vw', mx: 'auto', mt: 8 }}>
        <Typography variant="h6" gutterBottom>
          Upload Your Resume
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #1976d2",
            borderRadius: 2,
            p: 4,
            my: 2,
            cursor: "pointer",
            bgcolor: isDragActive ? "#e3f2fd" : "#fafafa",
            color: "#1976d2",
            transition: "background 0.2s",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
          {selectedFile ? (
            <Typography>{selectedFile.name}</Typography>
          ) : (
            <Typography>
              {isDragActive
                ? "Drop the file here ..."
                : "Drag and drop a PDF, DOC, or DOCX file here, or click to select"}
            </Typography>
          )}
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {uploadStatus}
        </Typography>
        {processResult && (
          <Paper sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5" }}>
            <Typography variant="subtitle2" color="primary">
              Processing Result:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {processResult}
            </Typography>
          </Paper>
        )}
    </Box>
  );
}

export default ResumeUploader;