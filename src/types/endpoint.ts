type AuthEndpoints =
    | 'auth/login'
    | 'auth/logout'
    | 'auth/check-email'
    | 'auth/check-authentication'
    | 'auth/get-user-session';

type UserEndpoints =
    | 'user/register'
    | 'user/update'
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
type DriverEndpoints =
    | 'driver/create'
    | 'driver/upload-criminal-record'
    | 'driver/upload-drug-test'
    | 'driver/upload-driver-license'
    | 'driver/create-visa'
    | 'driver/upload-visa-image'
    | 'driver/upload-driver-passport';

export interface EndpointsType {
    endpoint: AuthEndpoints | UserEndpoints | CountEndpoint | ProfileEndpoints | DriverEndpoints;
}
