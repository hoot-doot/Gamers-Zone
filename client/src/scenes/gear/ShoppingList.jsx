import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "http://localhost:3001/gear",
      { method: "GET" }
    );
    console.log(items);
    const itemsJson = await items.json();
    console.log(itemsJson);
    dispatch(setItems(itemsJson));
  }

  useEffect(() => {
    getItems();
  }, []);
  const filteredItems = items.filter(
    item => item.category.includes("Gaming")
  );
  const topRatedItems = filteredItems.filter(
    item => item.rating >= 4.5
  ); 

  const headset = filteredItems.filter(
    item => item.category.includes("Headset")
  );

  const keyboard = filteredItems.filter(
    item => item.category.includes("Keyboard")
  );
  const mouse = filteredItems.filter(
    item => item.category.includes("Mouse")
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="TOP RATED" value="topRated" />
        <Tab label="Headset" value="Headset" />
        <Tab label="Mouse" value="Mouse" />
        <Tab label="Keyboard" value="Keyboard" />
        
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          filteredItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
          {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "Headset" &&
          headset.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "Mouse" &&
          mouse.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
          {value === "Keyboard" &&
          keyboard.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        
      </Box>
    </Box>
  );
};

export default ShoppingList;
