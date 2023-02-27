import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
} from "@mui/material";

export default function Register() {
  return (
    <Container>
      <Box component="form">
        <FormGroup className="mb-3" controlId="formBasicEmail">
          <FormLabel>Email address</FormLabel>
          <FormControl type="email" placeholder="Enter email" />
        </FormGroup>

        <FormGroup className="mb-3" controlId="formBasicPassword">
          <FormLabel>Password</FormLabel>
          <FormControl type="password" placeholder="Password" />
        </FormGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
