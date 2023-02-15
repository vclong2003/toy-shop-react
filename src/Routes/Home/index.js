import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Pagination, Ratio, Row } from "react-bootstrap";
import { api_endpoint } from "../../config";
import styles from "./style.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  // For pagination
  const productsPerPage = 18;
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const paginationItems = [];

  const fetchProducts = () => {
    axios
      .get(
        `${api_endpoint}/product?skip=${
          productsPerPage * (activePage - 1)
        }&limit=${productsPerPage}`
      )
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.data);
          setPages(Math.ceil(res.data.count / productsPerPage));
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
  }, [activePage]);

  return (
    <Container>
      <Container fluid></Container>
      <Row>
        {products.map((item, index) => {
          return (
            <Col lg={2} key={index} className={styles.itemContainer}>
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
