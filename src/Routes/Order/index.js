import { Container, CssBaseline, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_endpoint } from "../../config";
import { DataGrid } from "@mui/x-data-grid";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const col = [
    { field: "date", headerName: "Date", width: 250 },
    { field: "totalBill", headerName: "Total", width: 250 },
    { field: "paymentMethod", headerName: "Payment", width: 250 },
    { field: "status", headerName: "Status", width: 250 },
  ];

  useEffect(() => {
    axios
      .get(`${api_endpoint}/order`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setOrders([...res.data]);
        }
        return;
      })
      .catch((err) => {
        return;
      });
  }, []);

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Typography variant="h5" marginTop="20px" marginBottom="20px">
        Your orders
      </Typography>
      <Divider />
      <DataGrid
        autoHeight
        rows={orders.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleString(),
          totalBill: "$" + item.totalBill,
        }))}
        rowHeight={50}
        columns={col}
        sx={{ marginTop: "20px", marginBottom: "40px" }}
        getRowId={(row) => row._id}
        rowSelection={false}
      />
    </Container>
  );
}
