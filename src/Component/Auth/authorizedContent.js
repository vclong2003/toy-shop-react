import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AuthorizedContent({
  children,
  requiredRole,
  message = false,
}) {
  const { singedIn, role } = useSelector((state) => state.user);

  let authorized = false;
  if (singedIn && role.includes(requiredRole)) {
    authorized = true;
  }

  return authorized ? (
    children
  ) : message ? (
    <Container>
      <h4>You are not allowed to use this function</h4>
    </Container>
  ) : (
    ""
  );
}
