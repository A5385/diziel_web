type AuthEndpoints = 'auth/login' | 'auth/check-email';

type UserEndpoints =
    | 'user/register'
    | 'user/verify-otp'
    | 'user/set-password'
    | 'user/find-user-by-email'
    | 'user/find-user-by-id';

type CountEndpoint = '';

export interface EndpointsType {
    endpoint: AuthEndpoints | UserEndpoints | CountEndpoint;
}
