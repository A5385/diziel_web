import { default as AppConfig, default as constants } from '@/constants/AppSettings';
import { getLocale } from '@/helpers/get-locale';
import axios, { AxiosError } from 'axios';
import { CheckAuthentication } from '../data-service/AuthService';

const serverUrl = constants.api.serverUrl;
const apiKey = constants.api.apiKey;

export const axiosInstance = axios.create({
    baseURL: serverUrl,
    timeout: 10000,
    withCredentials: true,
    headers: {
        [AppConfig.keys.apiKey]: apiKey,
    },
});
axiosInstance.interceptors.request.use(
    async (config) => {
        await CheckAuthentication();

        const locale = await getLocale();
        if (locale) {
            config.headers[AppConfig.keys.lang] = locale;
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (axios.isCancel(error)) {
            console.log('Request Canceled', error.message);
        }
        return Promise.reject(error);
    },
);
