import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { shades as colors } from "../../theme";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={colors.primary[500]}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="100px" color="secondary">
          UnityHub
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={'white'}
      >
        <Typography fontWeight="1500" variant="h5" sx={{ mb: "1.5rem" }}>
          
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;