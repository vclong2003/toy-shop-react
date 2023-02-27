import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
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
import styles from "./style.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // For pagination
  const productsPerPage = 18;
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
          window.scrollTo(0, 0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AllProducts = () => {
    return (
      <Container>
        {loading ? <LoadingLayer /> : ""}
        <Container className={styles.functionBtnConatainer}>
          <div style={{ width: "1%" }} />
          <AuthorizedContent requiredRole="staff">
            <Button
              onClick={() => {
                navigate("add");
              }}>
              Add product
            </Button>
          </AuthorizedContent>
        </Container>
        <Grid container spacing={2}>
          {products.map((item, index) => {
            return (
              <Grid item lg={3}>
                <Card>
                  <CardMedia sx={{ height: 200 }} image={item.thumbnailUrl} />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Container className={styles.paginationContainer}>
          <Pagination
            count={pages}
            page={activePage}
            onChange={(evt, value) => {
              setActivePage(value);
            }}
          />
        </Container>
      </Container>
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [activePage, sorting]);

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
