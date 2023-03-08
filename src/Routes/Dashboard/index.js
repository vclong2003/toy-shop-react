import { ManageAccounts, ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Box height="100%" sx={{ overflowY: "hidden" }}>
      <Grid container>
        <Grid item lg={2}>
          <Tabs
            orientation="vertical"
            variant="standard"
            value={activeTab}
            onChange={(evt, value) => {
              setActiveTab(value);
            }}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              height: "100vh",
              overflow: "hidden",
            }}>
            <Tab
              label={
                <>
                  <ShoppingCart />
                  <Box>Orders</Box>
                </>
              }
              value={0}
            />
            <Tab
              label={
                <>
                  <ManageAccounts />
                  <Box>User</Box>
                </>
              }
              value={1}
            />
          </Tabs>
        </Grid>
        <Grid item lg={8}>
          <Container>Test</Container>
        </Grid>
        <Grid item lg={8} />
      </Grid>
    </Box>
  );
}
