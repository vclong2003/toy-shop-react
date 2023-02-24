import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#F8F9FA",
      }}>
      <Container>
        <Typography>This site is developed by VCL™</Typography>
      </Container>
    </Box>
  );
}
