import {
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import _ from "underscore";
import { getCurrentUser } from "../../Component/User";
import { api_endpoint } from "../../config";

export default function Checkout() {
  const { shippingAddress } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const [orderData, setOrderData] = useState({
    shippingAddress: {},
    paymentMethod: "",
  });
  const paymentMethods = [
    {
      name: "Cash on Delivery",
      description: "Pays at the time of delivery",
      value: "COD",
    },
    {
      name: "Bank transfer (FREE SHIPPING)",
      description: "We will call you later to process",
      value: "Bank transfer",
    },
  ];

  const steps = [
    { name: "Shipping address", component: <AddressForm /> },
    { name: "Select payment method", component: <PaymentMethod /> },
    { name: "Review your order", component: <ReviewOrder /> },
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    window.scroll(0, 0);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    window.scroll(0, 0);
  };

  function AddressForm() {
    const [formData, setFormData] = useState({ ...shippingAddress });

    const handleSubmitForm = (evt) => {
      evt.preventDefault();
      setOrderData({ ...orderData, shippingAddress: { ...formData } });
      handleNext();
    };

    return (
      <Box component="form" onSubmit={handleSubmitForm}>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
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
              type="text"
              required
              label="Last name"
              fullWidth
              variant="standard"
              value={formData.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              required
              label="Phone number"
              fullWidth
              variant="standard"
              value={formData.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              required
              label="Address"
              fullWidth
              variant="standard"
              value={formData.detailedAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              required
              label="City"
              fullWidth
              variant="standard"
              value={formData.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              label="State/Province"
              fullWidth
              variant="standard"
              value={formData.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              required
              label="Zip / Postal code"
              fullWidth
              variant="standard"
              value={formData.postalCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              required
              label="Country"
              fullWidth
              variant="standard"
              value={formData.country}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }

  function PaymentMethod() {
    const handleSubmit = (evt) => {
      evt.preventDefault();
      setOrderData({ ...orderData, paymentMethod: evt.target.method.value });
      handleNext();
    };
    return (
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        onSubmit={handleSubmit}>
        <Typography variant="h6" marginBottom="10px">
          Payment method
        </Typography>
        <RadioGroup name="method">
          {paymentMethods.map((item, index) => {
            return (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                key={index}
                marginBottom="15px">
                <Radio value={item.value} required />
                <Box>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="caption" color="GrayText">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </RadioGroup>
        <Box display="flex" justifyContent="space-between">
          <Button onClick={handleBack} variant="outlined">
            Back
          </Button>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    );
  }

  function ReviewOrder() {
    return <Box></Box>;
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ minHeight: "100vh" }}>
      <CssBaseline />
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
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
        ) : (
          <>{steps[activeStep].component}</>
        )}
      </Paper>
    </Container>
  );
}
