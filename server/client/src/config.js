import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://homeoperations.herokuapp.com/"
})