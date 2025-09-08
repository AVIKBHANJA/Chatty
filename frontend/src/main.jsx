import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";

import "dropzone/dist/dropzone.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-center" autoClose={5000} stacked />
      </BrowserRouter>
    </ReduxProvider>
);
