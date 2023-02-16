import { useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import logout from "../Auth/logout";

export default function NavigationBar() {
  const { singedIn, email } = useSelector((state) => state.user);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">ATN Toy Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {singedIn ? (
              <NavDropdown title={email} id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              ""
            )}
            {singedIn ? "" : <Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
