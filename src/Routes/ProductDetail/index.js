import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
  }, []);

  return <Container>{productId}</Container>;
}
