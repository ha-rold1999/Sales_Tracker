import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-blue-500 w-screen h-screen m-0 p-0">
      <App />
    </div>
  </React.StrictMode>
);
