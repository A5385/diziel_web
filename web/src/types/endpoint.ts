type AuthEndpoints = 'auth/login' | 'auth/check-email';

type UserEndpoints =
    | 'user/register'
    | 'user/verify-phone'
    | 'user/verify-otp'
    | 'user/set-password'
    | 'user/find-user-by-phone'
    | 'user/find-user-by-id'
    | 'user/find-all'
    | 'user/toggle-block'
    | 'user/delete';

type ProfileEndpoints =
    | 'profile/update'
    | 'profile/upload-profile-image'
    | 'profile/update-profile-address'
    | 'profile/upload-national-images';

type CountEndpoint = '';

export interface EndpointsType {
    endpoint: AuthEndpoints | UserEndpoints | CountEndpoint | ProfileEndpoints;
}
