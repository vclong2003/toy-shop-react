import axios from "axios";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { api_endpoint } from "../../config";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (evt) => {
    evt.preventDefault();

    axios
      .post(
        `${api_endpoint}/auth/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Form>
    </Container>
  );
}
