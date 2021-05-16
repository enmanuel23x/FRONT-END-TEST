import axios from "axios";
import config from "../config/config";

const token = localStorage.getItem('token')
const Instance = axios.create({
    baseURL: config.apiURL
});

export default Instance
