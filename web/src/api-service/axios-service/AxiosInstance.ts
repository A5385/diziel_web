import constants from '@/constants/AppSettings';
import { isWebTokenExpired, TokenService } from '@/helpers/local-storage-service';
import axios, { AxiosError } from 'axios';
import { refreshWebAccessToken } from './RefreshToken';

const serverUrl = constants.api.serverUrl;
const apiKey = constants.api.apiKey;

export const axiosInstance = axios.create({
    baseURL: serverUrl,
    timeout: 10000,
    headers: {
        'x-api-key': apiKey,
    },
});
axiosInstance.interceptors.request.use(
    async (config) => {
        let token = TokenService.accessToken.get();

        if (token) {
            if (isWebTokenExpired(token)) {
                const refreshToken = TokenService.refreshToken.get();
                if (refreshToken) {
                    const rToken = await refreshWebAccessToken(refreshToken);
                    if (rToken) {
                        token = rToken;
                    }
                }
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        // console.log('🚀 >  config:', config);
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
