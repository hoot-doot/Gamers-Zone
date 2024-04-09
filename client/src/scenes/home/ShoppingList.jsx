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
      "http://localhost:3001/games",
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

  const topRatedItems = items.filter(
    item => item.rating >= 8
  ); 

  const actionGames = items.filter(
    item => item.category.includes("Action")
  );

  const strategyGames = items.filter(
    item => item.category.includes("Strategy")
  );
  // const bestSellersItems = items.filter(
  //   (item) => item.category === "bestSellers"
  // );

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
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="Strategy" value="strategyGames" />
        <Tab label="TOP RATED" value="topRated" />
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
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "actionGames" &&
          actionGames.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "strategyGames" &&
          strategyGames.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
