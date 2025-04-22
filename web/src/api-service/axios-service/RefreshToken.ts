import constants from '@/constants/constants';
import { TokenService } from '@/helpers/local-storage-service';
import axios from 'axios';

const { serverUrl, apiKey } = constants;

// Refresh the access token using the refresh token
export const refreshWebAccessToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const response = await axios.get<{ accessToken: string; refreshToken: string }>(
            `${serverUrl}/auth/refresh`,
            {
                headers: {
                    'x-api-key': apiKey, // Ensure API key is correct
                    Authorization: `Refresh ${refreshToken}`, // Correctly send the refresh token
                },
            },
        );

        if (response.data && response.data.accessToken) {
            const res = response.data;
            TokenService.accessToken.set(res.accessToken);
            TokenService.refreshToken.set(res.refreshToken);
            return res.accessToken;
        }
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        // throw new Error('Failed to refresh access token');
    }
    return null;
};
