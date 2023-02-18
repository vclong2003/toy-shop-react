import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import AuthorizedPage from "../../Component/Auth/authorizedPage";

export default function EditProduct() {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

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
          <Col lg={6}></Col>
        </Row>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}
