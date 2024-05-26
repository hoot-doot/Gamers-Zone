import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { Box, Button, Badge,Divider, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
function Home() {
  const navigate = useNavigate();
  return (
    <div className="gear">
      <MainCarousel />
      

<Badge
            color="secondary"
            
            sx={{
              padding:"10px 10px 0px 10px",
              display: 'flex', 
              justifyContent: 'center', 
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton onClick={() => navigate(`/`)}
              sx={{ width:"100px",height:"100px",color: "#1da6b3" ,'&:hover': { color: 'black' } }}
            >
              <SportsEsportsIcon sx={{width:"70px",height:"70px"}} />
            </IconButton>
            
          </Badge>

          < Typography color="#1da6b3" variant="h3" textAlign="center">Accessories</Typography>
      <ShoppingList />
    </div>
  );
}

export default Home;
