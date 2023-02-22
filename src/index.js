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
import EditProduct from "./Routes/ProductEdit";
import AuthorizedPage from "./Component/Auth/authorizedPage";
import ProductDetail from "./Routes/ProductDetail";

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
      .then((response) => {
        if (response.status === 200) {
          dispatch(setUser({ singedIn: true, ...response.data }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return loading ? (
    ""
  ) : (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route index element={<Navigate to="/product" />} />
        <Route path="/product/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
