import {
  AppBar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { shippingAddress } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ ...shippingAddress });
  const steps = [
    { name: "Shipping address", component: <AddressForm /> },
    { name: "Select payment method", component: <PaymentMethod /> },
    { name: "Review your order", component: <ReviewOrder /> },
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function AddressForm() {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="First name"
              fullWidth
              variant="standard"
              value={formData.firstName}
              onChange={(evt) => {
                setFormData({ ...formData, firstName: evt.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Last name"
              fullWidth
              variant="standard"
              value={formData.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Phone number"
              fullWidth
              variant="standard"
              value={formData.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Address"
              fullWidth
              variant="standard"
              value={formData.detailedAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="City"
              fullWidth
              variant="standard"
              value={formData.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State/Province"
              fullWidth
              variant="standard"
              value={formData.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Zip / Postal code"
              fullWidth
              variant="standard"
              value={formData.postalCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Country"
              fullWidth
              variant="standard"
              value={formData.country}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  function PaymentMethod() {
    return <Box></Box>;
  }

  function ReviewOrder() {
    return <Box></Box>;
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mb: 4, minHeight: "100vh" }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: "6px" }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper alternativeLabel activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((step) => (
            <Step key={step.name}>
              <StepLabel>{step.name}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </>
        ) : (
          <>
            {steps[activeStep].component}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}>
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}
