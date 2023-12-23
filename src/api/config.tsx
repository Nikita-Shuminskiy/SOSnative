import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const BASE_URL = 'https://stage.sos.luden-labs.com/'
export const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})
// Request interceptor for API calls
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            //@ts-ignore
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptor for API calls
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        return Promise.reject(error);
    },
);
