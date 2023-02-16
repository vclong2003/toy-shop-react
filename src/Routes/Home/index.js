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
import LoadingLayer from "../../Component/LoadingAnimation/layer";
import { api_endpoint } from "../../config";
import { setEmail, setUser } from "../../Redux/user";
import styles from "./style.module.css";

export default function Home() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    fetchProducts();
  }, [activePage, sorting]);

  return (
    <Container>
      {loading ? <LoadingLayer /> : ""}
      <Container fluid className={styles.orderBtnConatainer}>
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
      </Container>
      <Row>
        {products.map((item, index) => {
          return (
            <Col lg={2} sm={4} key={index} className={styles.itemContainer}>
              <Card>
                <Ratio aspectRatio="1x1">
                  <Card.Img variant="top" src="https://picsum.photos/300/300" />
                </Ratio>
                <Card.Body>
                  <h6>{item.name}</h6>
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
}
