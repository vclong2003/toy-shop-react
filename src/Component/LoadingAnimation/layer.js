import { CircularProgress } from "@mui/material";
import styles from "./layerStyles.module.css";

export default function LoadingLayer() {
  return (
    <div className={styles.container}>
      <CircularProgress animation="border" variant="light" />
    </div>
  );
}
