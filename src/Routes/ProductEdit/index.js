import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import { UUID } from "uuidjs";
import { api_endpoint } from "../../config";
import { uploadFileToFirebase } from "../../Firebase";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { productId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    thumbnailUrl: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleAddProducts = async (evt) => {
    evt.preventDefault();
    setSaving(true);

    let thumbnailUrl = null;
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadFileToFirebase(
          `ProductThumbnails/${UUID.generate()}`,
          thumbnailFile
        );
      } catch (error) {
        console.log(error);
      }
    }

    axios
      .post(
        `${api_endpoint}/product`,
        {
          ...data,
          thumbnailUrl: thumbnailUrl
            ? thumbnailUrl
            : "https://via.placeholder.com/150",
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setSaving(false);
      })
      .catch((err) => {
        console.log(err);
        setSaving(false);
      });
  };

  const fetchCurrentProduct = () => {
    setLoading(true);
    axios
      .get(`${api_endpoint}/product/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          setData({ ...res.data });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (productId) {
      setEditMode(true);
      fetchCurrentProduct();
    }
  }, []);

  return (
    <Container>
      {loading ? (
        ""
      ) : (
        <Form onSubmit={handleAddProducts}>
          <Row>
            {/* Left */}
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={data.name}
                  onChange={(evt) => {
                    setData({ ...data, name: evt.target.value });
                  }}
                />
              </Form.Group>
              <Row>
                <Col lg={5}>
                  {/* Thumbnail */}
                  <Form.Group className="mb-3">
                    <Form.Label>Thumbnail</Form.Label>
                    <Form.Control
                      type="file"
                      files={thumbnailFile}
                      onChange={(evt) => {
                        setThumbnailFile(evt.target.files[0]);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col lg={7}></Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={data.price}
                      onChange={(evt) => {
                        setData({ ...data, price: evt.target.value });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      value={data.stock}
                      onChange={(evt) => {
                        setData({ ...data, stock: evt.target.value });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            {/* Right */}
            <Col lg={6}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={data.description}
                  onChange={(value) => {
                    setData({ ...data, description: value });
                  }}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </Form>
      )}
    </Container>
  );
}
