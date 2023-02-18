import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, redirect } from "react-router-dom";

export default function AuthorizedPage({ children, requiredRole }) {
  const { singedIn, role } = useSelector((state) => state.user);

  if (!singedIn) {
    return <Navigate to="/login" />;
  }

  if (!role.includes(requiredRole)) {
    return (
      <Container>
        <h4>You are not allowed to view this page!</h4>
      </Container>
    );
  }

  return children;
}
