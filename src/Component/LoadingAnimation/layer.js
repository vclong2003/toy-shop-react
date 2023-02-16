import { Spinner } from "react-bootstrap";
import styles from "./layerStyles.module.css";

export default function LoadingLayer() {
  return (
    <div className={styles.container}>
      <Spinner animation="border" variant="light" />
    </div>
  );
}
