import axios from "axios";
import { api_endpoint } from "../../config";
import store from "../../Redux/store";
import { setUser } from "../../Redux/user";
import { fetchCart } from "../Cart";

export const getCurrentUser = async () => {
  await axios
    .get(`${api_endpoint}/user`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(setUser({ singedIn: true, ...res.data }));
        fetchCart();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

