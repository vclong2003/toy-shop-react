import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import AuthorizedPage from "../../Component/Auth/authorizedPage";

export default function EditProduct() {
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: 0,
    stock: 0,
    thumbnailUrl: "",
  });
  const [richDescription, setRichDescription] = useState("");

  useEffect(() => {
    console.log(richDescription);
  }, [richDescription]);

  return (
    <Container>
      <Form>
        <Row>
          {/* Left */}
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Row>
              <Col lg={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Thumbnail</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
              <Col lg={7}></Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" step="0.01" />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" />
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
                value={richDescription}
                onChange={setRichDescription}
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
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}
