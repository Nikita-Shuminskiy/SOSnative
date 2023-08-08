import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const instance = axios.create({
    baseURL: 'https://sos.luden-labs.com/',
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
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const {data} = await instance.post<{ token: string }>(`auth/refresh`);
            axios.defaults.headers.common['authorization'] = 'Bearer ' + data.token;
            return instance(originalRequest);
        }
        return Promise.reject(error);
    },
);
