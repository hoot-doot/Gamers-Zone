import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { shades as colors } from "../../theme";
import { Box, Typography, useTheme, TextField } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// Popup component
export default function Popup() {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4000);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleClose();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [anchorEl]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      setLoginStatus("Loading...");
      const response = await fetch("http://localhost:3001/auth/send-reset-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.msg) {
        setStep(2);
      } else {
        setLoginStatus("Email doesn't exist!");
      }
    } catch (error) {
      setLoginStatus("Error: Unable to send email.");
      console.error(error);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/verify-otp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: { code: otp },
      });
      const data = await response.json();
      if (data.msg) {
        setStep(3);
        setLoginStatus("");
      } else {
        setLoginStatus(data.err);
      }
    } catch (error) {
      setLoginStatus("Error: Unable to verify OTP.");
      console.error(error);
    }
  };

  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.msg) {
        handleClose();
      } else {
        setLoginStatus(data.message);
      }
    } catch (error) {
      setLoginStatus("Error: Unable to reset password.");
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography
        aria-describedby={id}
        variant="body1"
        onClick={handleClick}
        sx={{
          textDecoration: "underline",
          color: "black",
          "&:hover": {
            cursor: "pointer",
            color: "grey",
          },
        }}
      >
        Forgot your password?
      </Typography>
      {open && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "180%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={handleClose}
        />
      )}
      <Popover
        id={id}
        open={open}
        anchorReference={"none"}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          sx={{
            p: 2,
            backgroundColor: colors.primary[400],
            width: "60vh",
            height: "55vh", // increased height
            borderRadius: "10px",
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <Box
            m={"auto"}
            sx={{
              mt: 3,
              backgroundColor: colors.secondary[100],
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
              height: "100px",
            }}
          >
            <Box
              sx={{
                backgroundColor: colors.secondary[200],
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
              }}
            >
              <VpnKeyIcon
                sx={{ color: colors.secondary[600], fontSize: "36px" }}
              />
            </Box>
          </Box>
          <Typography
            variant="h2"
            fontWeight={600}
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            FORGOT PASSWORD
          </Typography>
          {step === 1 && (
            <Box>
              <Typography
                variant="h6" // changed from h5 to h6
                sx={{
                  mb: 2,
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Provide your account's email
              </Typography>
              <form onSubmit={handleEmailSubmit}>
                <TextField
                  variant="outlined"
                  value={email}
                  label="Email Address"
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Typography fontSize={"13px"} color={"red"}>
                  {isAlertVisible && loginStatus}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: colors.secondary[200],
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    mt: 3,
                  }}
                  onClick={handleButtonClick}
                >
                  Submit
                </Button>
              </form>
            </Box>
          )}
          {step === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                Enter the OTP sent to your email
              </Typography>
              <form onSubmit={handleOtpSubmit}>
                <TextField
                  label="OTP"
                  variant="outlined"
                  value={otp}
                  inputProps={{ style: { width: 300 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                  onChange={(event) => setOtp(event.target.value)}
                  sx={{ mb: 2 }}
                />
                <Typography fontSize={"11px"} color={"red"}>
                  {isAlertVisible && loginStatus}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: colors.secondary[200],
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    mt: 3,
                  }}
                  onClick={handleButtonClick}
                >
                  Submit
                </Button>
              </form>
            </Box>
          )}
          {step === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                Enter your new password
              </Typography>
              <form onSubmit={handleNewPasswordSubmit}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  inputProps={{ style: { width: 300 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                  onChange={(event) => setPassword(event.target.value)}
                  sx={{ mb: 1 }}
                />
                <Typography fontSize={"11px"} color={"red"}>
                  {isAlertVisible && loginStatus}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: colors.secondary[200],
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    mt: 3,
                  }}
                  onClick={handleButtonClick}
                >
                  Submit
                </Button>
              </form>
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
}