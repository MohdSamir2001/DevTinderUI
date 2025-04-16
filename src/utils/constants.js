const isDev = window.location.hostname === "localhost";
export const BASE_URL = isDev
  ? "http://localhost:7860"
  : "https://backdevtinder.onrender.com";
