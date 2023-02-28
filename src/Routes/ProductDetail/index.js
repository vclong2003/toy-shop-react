import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { api_endpoint } from "../../config";
import AuthorizedContent from "../../Component/Auth/authorizedContent";
import { Button, Container, CssBaseline, Dialog, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${api_endpoint}/product/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          setData({ ...res.data });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProduct = () => {
    setDeleting(true);
    axios
      .delete(`${api_endpoint}/product/${productId}`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    ""
  ) : (
    <Container>
      <CssBaseline />
      <Grid container>
        <Grid lg={5}>
          <Box>
            <img alt="" src={data.thumbnailUrl} width="100%" />
          </Box>
        </Grid>
        <Grid lg={1} />
        <Grid lg={5}>
          <Box>
            <h4>
              <strong>{data.name}</strong>
            </h4>
          </Box>
          <Box>
            <h5>{data.price}$</h5>
          </Box>
          <div style={{ height: "10px" }} />
          <Grid container>
            <Grid lg={6}>
              <Button variant="outline-primary" style={{ width: "100%" }}>
                Add to cart
              </Button>
            </Grid>
            <Grid lg={4}>{data.stock} items available</Grid>
          </Grid>
        </Grid>

        <Grid lg={1}>
          <AuthorizedContent requiredRole="staff">
            <Button
              variant="outline-success"
              onClick={() => {
                navigate("edit");
              }}>
              <i className="bi bi-pencil" />
            </Button>
            <div style={{ height: "8px" }} />
            <Button
              variant="outline-danger"
              onClick={() => {
                setDeleteModalVisible(true);
              }}>
              <i className="bi bi-trash2" />
            </Button>
          </AuthorizedContent>
        </Grid>
      </Grid>
      <Box dangerouslySetInnerHTML={{ __html: data.description }}></Box>
      <Dialog
        open={deleteModalVisible}
        onClose={() => {
          setDeleteModalVisible(false);
        }}>
        <Box>
          <h5>Delete this product?</h5>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}>
            <Button
              variant="outline-danger"
              onClick={handleDeleteProduct}
              disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
            <div style={{ width: "5px" }} />
            <Button
              variant="outline-secondary"
              onClick={() => {
                setDeleteModalVisible(false);
              }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Dialog>
    </Container>
  );
}
