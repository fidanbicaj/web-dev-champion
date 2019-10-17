import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://deckofcardsapi.com/api/deck/new/'
});

axiosInstance.interceptors.response.use(response =>response, error => {
   console.error(error);
});

export default axiosInstance;