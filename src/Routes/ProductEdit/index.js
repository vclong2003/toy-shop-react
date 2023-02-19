import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import { api_endpoint } from "../../config";

export default function EditProduct() {
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    thumbnailUrl: "https://via.placeholder.com/150 ",
  });
  const [thumbnailFile, setThumbnailFile] = useState();

  const handleAddProducts = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    axios
      .post(
        `${api_endpoint}/product`,
        {
          name: data.name,
          thumbnailUrl: data.thumbnailUrl,
          description: data.description,
          price: data.price,
          stock: data.stock,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(data);
    console.log(thumbnailFile);
  }, [data, thumbnailFile]);

  return (
    <Container>
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
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Form>
    </Container>
  );
}
