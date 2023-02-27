import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  LinearProgress,
  Pagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthorizedContent from "../../Component/Auth/authorizedContent";
import AuthorizedPage from "../../Component/Auth/authorizedPage";
import LoadingLayer from "../../Component/LoadingAnimation/layer";
import { api_endpoint } from "../../config";
import ProductDetail from "../ProductDetail";
import EditProduct from "../ProductEdit";

export default function Home() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // For pagination
  const productsPerPage = 16;
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const paginationItems = [];

  //For sorting
  const sortOptions = [
    { name: "Newest first", value: "dateAdded_desc" },
    { name: "Low price", value: "price_asc" },
    { name: "Name A-Z", value: "name_asc" },
  ];
  const [sorting, setSorting] = useState("dateAdded_desc");

  const fetchProducts = () => {
    window.scrollTo(0, 0);
    setLoading(true);
    axios
      .get(
        `${api_endpoint}/product?sort=${sorting}&skip=${
          productsPerPage * (activePage - 1)
        }&limit=${productsPerPage}`
      )
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.data);
          setPages(Math.ceil(res.data.count / productsPerPage));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [activePage, sorting]);

  const AllProducts = () => {
    return (
      <Container>
        {loading ? <LinearProgress /> : ""}
        <Box marginTop="10px" marginBottom="10px">
          <AuthorizedContent requiredRole="staff">
            <Button
              onClick={() => {
                navigate("add");
              }}
              variant="outlined">
              Add product
            </Button>
          </AuthorizedContent>
        </Box>
        <Grid container spacing={3}>
          {products.map((item, index) => {
            return (
              <Grid item lg={3} key={index} sx={{ cursor: "pointer" }}>
                <Card variant="outlined">
                  <CardMedia sx={{ height: 240 }} image={item.thumbnailUrl} />
                  <CardContent>
                    <Typography
                      variant="body1"
                      component="div"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price}$
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          marginTop="10px"
          marginBottom="10px">
          <Pagination
            color="primary"
            count={pages}
            page={activePage}
            onChange={(evt, value) => {
              setActivePage(value);
            }}
          />
        </Box>
      </Container>
    );
  };

  return (
    <Routes>
      <Route index element={<AllProducts />}></Route>
      <Route path=":productId" element={<ProductDetail />} />
      <Route
        path=":productId/edit"
        element={
          <AuthorizedPage requiredRole="staff">
            <EditProduct />
          </AuthorizedPage>
        }
      />
      <Route
        path="add"
        element={
          <AuthorizedPage requiredRole="staff">
            <EditProduct />
          </AuthorizedPage>
        }
      />
    </Routes>
  );
}
