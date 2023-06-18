import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();
export default axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": cookie.get("jwt"),
  },
});
