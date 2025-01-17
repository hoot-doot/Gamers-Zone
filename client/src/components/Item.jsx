import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box,Rating, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, rating, picturePath } = item;


  return (
    <Box width={width}>
      <Box
        width={width}
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{ overflow: "hidden" }}
      >
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={picturePath[0]}
          onClick={() => navigate(`/item/${item._id}`)}
          style={{ cursor: "pointer" , objectFit: "cover",transition: 'transform 0.3s ease-in-out',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'}}
        />
        
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[500], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category[1]}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">Nrs {price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
