import {
  CheckBox,
  Close,
  Delete,
  Remove,
  RemoveCircle,
} from "@mui/icons-material";
import { AspectRatio } from "@mui/joy";
import {
  Box,
  CssBaseline,
  Drawer,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api_endpoint } from "../../config";
import { closeCart, setCartItems } from "../../Redux/cart";

export default function Cart() {
  const { items, count, open } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [updatingQuantity, setUpdatingQuantity] = useState(false);

  const handleUpdateItemQuantity = (_id, quantity) => {
    setUpdatingQuantity(true);
    axios
      .put(
        `${api_endpoint}/cart`,
        { product: _id, quantity: quantity },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          const { items } = res.data;
          dispatch(setCartItems(items));
          setUpdatingQuantity(false);
        }
      });
  };

  const CartItem = ({ item }) => {
    const { name, thumbnailUrl, price, _id } = item.product;
    const [quantity, setQuantity] = useState(item.quantity);

    return (
      <Grid
        container
        padding="2%"
        boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
        borderRadius="6px">
        <Grid item lg={4} borderRadius="6px" overflow="hidden">
          <AspectRatio ratio="1/1">
            <img alt="" src={thumbnailUrl} width="100%" />
          </AspectRatio>
        </Grid>
        <Grid item lg={1} />
        <Grid item lg={7}>
          <Box>
            <Typography
              variant="body1"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis">
              {name}
            </Typography>
            <Typography variant="subtitle2" color="GrayText">
              ${price}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <TextField
              variant="standard"
              label="Quantity"
              type="number"
              step="0.01"
              min="0"
              value={quantity}
              onChange={(evt) => {
                setQuantity(evt.target.value);
                setTimeout(() => {
                  handleUpdateItemQuantity(_id, evt.target.value);
                }, 500);
              }}
              disabled={updatingQuantity}
            />
            <IconButton>
              <Delete />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        dispatch(closeCart());
      }}
      sx={{ maxHeight: "100vh", overflowY: "scroll" }}>
      <CssBaseline />
      <Box>
        <IconButton
          onClick={() => {
            dispatch(closeCart());
          }}>
          <Close />
        </IconButton>
      </Box>

      <Box width="25vw" paddingLeft="4%" paddingRight="4%">
        {items.map((item, index) => {
          console.log(item);
          return <CartItem item={item} key={index} />;
        })}
      </Box>
    </Drawer>
  );
}
