import { useDispatch, useSelector } from "react-redux";
import { Badge, Box,MenuItem, IconButton ,Typography} from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import Popover from '@mui/material/Popover';
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen,setLogout } from "../../state";
import * as React from 'react';
import Button from '@mui/material/Button'

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.cart.user);
  const firstName = user?.firstName
  const picture = useSelector((state) => state.cart.user);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Check if the current route is the login page
  const token = useSelector((state) => state.cart.token);
  console.log(token)
  const isAuth = Boolean(token);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={"#1da6b3"}
        >
          <Typography variant="h3">
          Gamers Zone
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >

          <Button aria-describedby={id}  onClick={handleClick}>
          <PersonOutline />
      </Button>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        
        <MenuItem  >
        <Typography variant="h5" >{user?.firstName} { }
                {user?.lastName}</Typography>
                
        </MenuItem>
        {isAuth ?(
        <MenuItem onClick={() => dispatch(setLogout())} >
                Log Out
        </MenuItem>):(<MenuItem onClick={() => navigate("login")} >
                Log in
        </MenuItem>)
        }
      </Popover>

          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
