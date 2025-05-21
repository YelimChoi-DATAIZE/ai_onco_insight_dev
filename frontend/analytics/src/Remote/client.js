import axios from "axios";

axios.defaults.withCredentials = false;
axios.defaults.headers["Content-Type"] = "application/json";

export default axios;
