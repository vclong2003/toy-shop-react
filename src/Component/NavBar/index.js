import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import logout from "../Auth/logout";

export default function NavigationBar() {
  const { singedIn, email } = useSelector((state) => state.user);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ATN Toy Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          {singedIn ? "" : <Button href="/login">Login</Button>}
          {singedIn ? (
            <NavDropdown title={email} id="basic-nav-dropdown">
              <NavDropdown.Item>Cart</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button
                  onClick={logout}
                  style={{ width: "100%" }}
                  variant="dark">
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
