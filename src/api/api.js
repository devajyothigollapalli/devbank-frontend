// src/api/api.js
import axios from "axios";

// Named export for API instance
export const api = axios.create({
  baseURL: "https://devbank-backend-production.up.railway.app/api"
});

// Named export for error handler
export const handleError = (e) => {
  if (e.response && e.response.data) {
    const d = e.response.data;
    if (typeof d === "string") alert(d);
    else if (d.message) alert(d.message);
    else alert(JSON.stringify(d, null, 2));
  } else alert("Server Error");
};
