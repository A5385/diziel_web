import AppSettings from '@/constants/AppSettings';
import { ApiResponseType, MethodType } from '@/types/backend';
import { AxiosError, AxiosResponse } from 'axios';
import notify from './AxiosNotify';

export const handleAxiosResponse = async <T>({
    fn,
    method,
    fullResponse = false,
    notifyEnabled = true, // Option to enable/disable notifications
}: {
    fn: () => Promise<AxiosResponse<ApiResponseType<T> | T>>;
    method?: MethodType;
    notifyEnabled?: boolean;
    fullResponse?: boolean;
}): Promise<T | undefined> => {
    try {
        const response = await fn();
        if (fullResponse) {
            return response as T;
        } else {
            const { ok, data, message, error } = (response as AxiosResponse<ApiResponseType<T>>)
                .data;

            if (ok) {
                if (notifyEnabled && method !== 'get' && message) {
                    notify({ message, type: 'success' });
                }
                return data;
            }

            if (notifyEnabled && error?.message) {
                notify({ message: error.message, type: 'error' });
            }

            return undefined;
        }
    } catch (error) {
        const axiosError = error as AxiosError<{
            error: { message: string; error: string };
        }>;

        if (axiosError.response) {
            const { status } = axiosError.response;

            if (status >= 500 && status < 600) {
                // Handle server errors (5xx)
                if (notifyEnabled) {
                    notify({
                        message: 'Server error occurred. Please try again later.',
                        type: 'error',
                    });
                }
            } else if (status >= 400 && status < 500) {
                // Handle client errors (4xx)
                const { error: errorDetail } = axiosError.response.data?.error || {
                    message: 'An unexpected error occurred.',
                    error: 'Unknown error',
                };

                if (notifyEnabled && method !== 'get') {
                    notify({
                        message: `Error: ${errorDetail}`,
                        type: 'error',
                    });
                }
            }
        } else if (axiosError.request) {
            if (notifyEnabled) {
                notify({
                    message: 'Network error occurred. Please check your connection.',
                    type: 'error',
                });
            }
        } else {
            if (notifyEnabled) {
                notify({
                    message: 'An unexpected error occurred. Please try again.',
                    type: 'error',
                });
            }
        }

        !AppSettings.isProduction &&
            console.error('Axios Error:', JSON.stringify(axiosError, null, 2));

        return undefined;
    }
};
