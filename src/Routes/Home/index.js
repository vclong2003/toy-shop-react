import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../counterSlice";

export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Container>
      <button
        onClick={() => {
          dispatch(increment());
        }}>
        +
      </button>
      <div>{count}</div>
      <button
        onClick={() => {
          dispatch(decrement());
        }}>
        -
      </button>
    </Container>
  );
}
