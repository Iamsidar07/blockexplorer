import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Block from "./pages/Block";
import Address from "./pages/Address";
import Transactions from "./pages/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/block/:blockNumber",
    element: <Block />,
  },
  {
    path: "/tx/:txHash",
    element: <Transactions />,
  },
  {
    path: "/address/:address",
    element: <Address />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
