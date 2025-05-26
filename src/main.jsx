// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import ReactGA from 'react-ga';

// Initialize Google Analytics (only in production)
if (import.meta.env.PROD) {
  ReactGA.initialize('G-BWJPDWDD3R'); // Replace with your actual Google Analytics ID
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
