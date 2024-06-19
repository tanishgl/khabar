import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NewsProvider } from "./Providers/NewsProvider.jsx";
import { FavProvider } from "./Providers/FavProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NewsProvider>
      <FavProvider>
        <App />
      </FavProvider>
    </NewsProvider>
  </React.StrictMode>
);
