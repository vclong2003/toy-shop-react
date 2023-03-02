import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./Routes/Home";
import NavigationBar from "./Component/NavBar";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import { api_endpoint } from "./config";
import { Provider, useDispatch } from "react-redux";
import store from "./Redux/store";
import { setUser } from "./Redux/user";
import { setCartItems } from "./Redux/cart";
import Footer from "./Component/Footer";
import Cart from "./Component/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    setLoading(true);
    await axios
      .get(`${api_endpoint}/user`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUser({ singedIn: true, ...res.data }));
          getCurrentCart();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getCurrentCart = async () => {
    await axios
      .get(`${api_endpoint}/cart`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          const { items } = res.data;
          dispatch(setCartItems(items));
        }
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return loading ? (
    ""
  ) : (
    <BrowserRouter>
      <NavigationBar />
      <Cart />
      <Routes>
        <Route index element={<Navigate to="/product" />} />
        <Route path="/product/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
