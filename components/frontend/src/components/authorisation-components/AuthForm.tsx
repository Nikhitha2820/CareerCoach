import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { TextField, Button, Paper, Typography, Link, Box } from "@mui/material";
import { RedditTextField } from "../common-components/CustomTextField";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/login" : "/api/register";

    try {
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT for cookies
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("userLoggedIn", "true");
        navigate("/dashboard");
        console.log(data.message);
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100vw"
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", width: 400, borderRadius: 10 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <RedditTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="filled"
          />
          <RedditTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="filled"
          />
          <Button type="submit" variant="contained" color="primary">
            {isLogin ? "Login" : "Register"}
          </Button>

          <Box>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "10px" }}
            >
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                href="#"
                onClick={() => setIsLogin(!isLogin)}
                style={{ cursor: "pointer" }}
              >
                {isLogin ? "Register here" : "Login here"}
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
