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
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_endpoint } from "../../config";

export default function Dashboard() {
  const { singedIn, role } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState(0);

  return !role.includes("staff") && !role.includes("admin") ? (
    <Typography variant="h5">You are not allowed to view this page!</Typography>
  ) : (
    <Box>
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
          <Container>
            <OrdersManager />
          </Container>
        </Grid>
        <Grid item lg={2} />
      </Grid>
    </Box>
  );
}

function OrdersManager() {
  const statusOption = [
    "Pending",
    "In progress",
    "Completed",
    "Returned",
    "Canceled",
  ];
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState();

  const loadAllOrders = () => {
    axios
      .get(`${api_endpoint}/order/all`, { withCredentials: true })
      .then((res) => {
        setOrders([...res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadAllOrders();
  }, []);

  return <Box></Box>;
}
