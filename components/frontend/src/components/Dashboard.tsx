import { AppBar, Toolbar, Typography, Box, Paper, TextField, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ResumeUploader from "./modules/ResumeUploader";

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.2rem",
  backgroundColor: "#ffffff",
  cursor: "pointer",
}));

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#4CAF50" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Menu Bar
          </Typography>
          <Typography variant="h6">Header for Page</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ p: 4, backgroundColor: "#e0e0e0", minHeight: "100vh" }}>
        <Grid container spacing={4}>
          {/* Frame 1 */}
          <Grid item xs={12}>
            <ResumeUploader/>
          </Grid>

          {/* Frame 2 */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ASK YOUR QUERIES VIA CHAT
            </Typography>
            <Paper sx={{ p: 2, display: "flex", alignItems: "center" }}>
              <TextField
                placeholder="Chat Space"
                variant="outlined"
                fullWidth
                sx={{ mr: 2 }}
              />
              <Button variant="contained">Send</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
