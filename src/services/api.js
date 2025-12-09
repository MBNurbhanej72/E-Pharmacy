import axios from "axios";

export const Api = axios.create({
  baseURL: "https://www.emaad-infotech.com/product/e-pharma/",
});