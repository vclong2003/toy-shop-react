import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Pagination,
  Ratio,
  Row,
} from "react-bootstrap";
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

  // Render pagination items
  for (let i = 1; i <= pages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === activePage}
        onClick={() => {
          setActivePage(i);
        }}>
        {i}
      </Pagination.Item>
    );
  }

  const AllProducts = () => {
    return (
      <Container>
        {loading ? <LoadingLayer /> : ""}
        <Container fluid className={styles.functionBtnConatainer}>
          <Dropdown>
            <Dropdown.Toggle>Sort by</Dropdown.Toggle>
            <Dropdown.Menu>
              {sortOptions.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      setSorting(item.value);
                      setActivePage(1);
                    }}
                    style={{
                      background: sorting === item.value ? "#E4E5E6" : "",
                    }}>
                    {item.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ width: "1%" }} />
          <AuthorizedContent requiredRole="staff">
            <Button
              variant="light"
              onClick={() => {
                navigate("add");
              }}>
              Add product
            </Button>
          </AuthorizedContent>
        </Container>
        <Row>
          {products.map((item, index) => {
            return (
              <Col lg={2} sm={4} key={index} className={styles.itemContainer}>
                <Card
                  onClick={() => {
                    navigate(`${item._id}`);
                  }}
                  style={{ cursor: "pointer" }}>
                  <Ratio aspectRatio="1x1">
                    <Card.Img variant="top" src={item.thumbnailUrl} />
                  </Ratio>
                  <Card.Body>
                    <h6 className={styles.toyName}>{item.name}</h6>
                    <p>{item.price}$</p>
                    <div>
                      <i className="bi bi-cart-plus" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Container fluid className={styles.paginationContainer}>
          <Pagination>{paginationItems}</Pagination>
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
