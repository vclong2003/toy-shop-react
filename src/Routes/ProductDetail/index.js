import styles from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Modal,
  Ratio,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { api_endpoint } from "../../config";
import AuthorizedContent from "../../Component/Auth/authorizedContent";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleDeleteProduct = () => {
    setDeleting(true);
    axios
      .delete(`${api_endpoint}/product/${productId}`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    ""
  ) : (
    <Container className={styles.container}>
      <Row className={styles.top}>
        <Col lg={5}>
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
            <h4>
              <strong>{data.name}</strong>
            </h4>
          </Row>
          <Row>
            <h5>{data.price}$</h5>
          </Row>
          <div style={{ height: "10px" }} />
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

        <Col lg={1} className={styles.editBtnContainer}>
          <AuthorizedContent requiredRole="staff">
            <Button
              variant="outline-success"
              onClick={() => {
                navigate("edit");
              }}>
              <i className="bi bi-pencil" />
            </Button>
            <div style={{ height: "8px" }} />
            <Button
              variant="outline-danger"
              onClick={() => {
                setDeleteModalVisible(true);
              }}>
              <i className="bi bi-trash2" />
            </Button>
          </AuthorizedContent>
        </Col>
      </Row>
      <Row
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: data.description }}></Row>
      <Modal
        show={deleteModalVisible}
        onHide={() => {
          setDeleteModalVisible(false);
        }}>
        <Modal.Body>
          <h5>Delete this product?</h5>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}>
            <Button
              variant="outline-danger"
              onClick={handleDeleteProduct}
              disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
            <div style={{ width: "5px" }} />
            <Button
              variant="outline-secondary"
              onClick={() => {
                setDeleteModalVisible(false);
              }}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
