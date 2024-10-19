import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn({ onSignin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/login-admin`, {
        Users_Username: username, // เปลี่ยน key เป็น Users_Username
        Users_Password: password, // เปลี่ยน key เป็น Users_Password
      });

      const result = response.data;
      if (result.status) {
        onSignin(); // เรียกฟังก์ชันการเข้าสู่ระบบจาก props
      } else {
        setError(result.message); // แสดงข้อความผิดพลาด
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาด โปรดลองอีกครั้ง"); // ข้อความผิดพลาดทั่วไป
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            padding: 3,
            borderRadius: '16px',
            boxShadow: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#000000', width: 56, height: 56 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />
          </Avatar>

          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
              name="password"
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
             
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50' }}
              id="btnLogin"
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
