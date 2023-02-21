import styles from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Ratio, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { api_endpoint } from "../../config";
import AuthorizedContent from "../../Component/Auth/authorizedContent";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${api_endpoint}/product/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          setData({ ...res.data });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    ""
  ) : (
    <Container className={styles.container}>
      <Row>
        <Col lg={1} />
        <Col lg={4}>
          <Ratio aspectRatio="1x1">
            <Image
              src={data.thumbnailUrl}
              className={styles.thumbNail}
              width="100%"
            />
          </Ratio>
        </Col>
        <Col lg={1} />
        <Col lg={5} className={styles.infoContainer}>
          <Row>
            <h3>
              <strong>{data.name}</strong>
            </h3>
          </Row>
          <Row>
            <h5>{data.price}$</h5>
          </Row>
          <div style={{ height: "20px" }} />
          <Row>
            <Col lg={6}>
              <Button variant="outline-primary" style={{ width: "100%" }}>
                Add to cart
              </Button>
            </Col>
            <Col lg={4} className={styles.stock}>
              {data.stock} items available
            </Col>
          </Row>
        </Col>
        <AuthorizedContent requiredRole="staff">
          <Col lg={1}>
            <Button
              variant="outline-success"
              onClick={() => {
                navigate("edit");
              }}>
              <i className="bi bi-pencil" />
            </Button>
            <div style={{ height: "8px" }} />
            <Button variant="outline-danger">
              <i className="bi bi-trash2" />
            </Button>
          </Col>
        </AuthorizedContent>
      </Row>
      <Row
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: data.description }}></Row>
    </Container>
  );
}
