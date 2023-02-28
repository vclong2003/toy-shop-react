import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import { UUID } from "uuidjs";
import { api_endpoint } from "../../config";
import { uploadFileToFirebase } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import { AspectRatio } from "@mui/joy";

export default function EditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    thumbnailUrl: "https://via.placeholder.com/500?text=Placeholder",
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleAddProducts = async (evt) => {
    evt.preventDefault();
    setSaving(true);

    let thumbnailUrl = null;
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadFileToFirebase(
          `ProductThumbnails/${UUID.generate()}`,
          thumbnailFile
        );
      } catch (error) {
        console.log(error);
      }
    }

    axios
      .post(
        `${api_endpoint}/product`,
        {
          ...data,
          thumbnailUrl: thumbnailUrl ? thumbnailUrl : data.thumbnailUrl,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setSaving(false);
      })
      .catch((err) => {
        console.log(err);
        setSaving(false);
      });
  };

  const handleUpdateProduct = async (evt) => {
    evt.preventDefault();
    setSaving(true);

    let thumbnailUrl = null;
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadFileToFirebase(
          `ProductThumbnails/${UUID.generate()}`,
          thumbnailFile
        );
      } catch (error) {
        console.log(error);
      }
    }

    axios
      .put(
        `${api_endpoint}/product/${productId}`,
        {
          ...data,
          thumbnailUrl: thumbnailUrl ? thumbnailUrl : data.thumbnailUrl,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setSaving(false);
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
        setSaving(false);
      });
  };

  const fetchCurrentProduct = () => {
    setLoading(true);
    axios
      .get(`${api_endpoint}/product/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          setData({ ...res.data });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (productId) {
      setEditMode(true);
      fetchCurrentProduct();
    }
  }, []);

  return loading ? (
    ""
  ) : (
    <Container sx={{ marginTop: "20px" }}>
      <CssBaseline />
      <Box
        component="form"
        onSubmit={editMode ? handleUpdateProduct : handleAddProducts}>
        <Grid>
          {/* Left */}
          <Grid lg={6}>
            <FormGroup>
              <TextField
                label="Product name"
                value={data.name}
                onChange={(evt) => {
                  setData({ ...data, name: evt.target.value });
                }}
              />
            </FormGroup>
            <Grid>
              <Grid lg={7}>
                {/* Thumbnail */}
                <FormGroup>
                  <FormLabel>Thumbnail</FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    files={thumbnailFile}
                    onChange={(evt) => {
                      setThumbnailFile(evt.target.files[0]);
                    }}
                  />
                </FormGroup>
              </Grid>
              <Grid lg={5}>
                <AspectRatio ratio="1/1">
                  <image
                    src={
                      thumbnailFile
                        ? URL.createObjectURL(thumbnailFile)
                        : data.thumbnailUrl
                    }
                    width="100%"
                  />
                </AspectRatio>
              </Grid>
            </Grid>
            <Grid>
              <Grid lg={6}>
                <FormGroup>
                  <TextField
                    label="Price"
                    type="number"
                    step="0.01"
                    value={data.price}
                    onChange={(evt) => {
                      setData({ ...data, price: evt.target.value });
                    }}
                  />
                  <FormControl />
                </FormGroup>
              </Grid>
              <Grid lg={6}>
                <FormGroup>
                  <TextField
                    label="Stock"
                    type="number"
                    value={data.stock}
                    onChange={(evt) => {
                      setData({ ...data, stock: evt.target.value });
                    }}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          {/* Right */}
          <Grid lg={6}>
            <FormGroup>
              <FormLabel>Description</FormLabel>
              <ReactQuill
                theme="snow"
                value={data.description}
                onChange={(value) => {
                  setData({ ...data, description: value });
                }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        {editMode ? (
          ""
        ) : (
          <Button
            variant="outline-secondary"
            onClick={() => {
              setData({
                description: "",
                thumbnailUrl:
                  "https://via.placeholder.com/500?text=Placeholder",
                name: "",
                price: 0,
                stock: 0,
              });
              setThumbnailFile(null);
            }}>
            Clear
          </Button>
        )}
        <Button
          variant="outline-secondary"
          onClick={() => {
            navigate(-1);
          }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
