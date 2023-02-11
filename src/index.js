import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./Routes/Home";
import NavigationBar from "./Component/NavBar";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import { api_endpoint } from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

async function PrivateRoute({ children }) {
  let user;
  await axios
    .get(`${api_endpoint}/user`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  return children;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
