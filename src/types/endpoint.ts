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
    | 'user/toggle-verify'
    | 'user/delete';

type ProfileEndpoints =
    | 'profile/update'
    | 'profile/upload-profile-image'
    | 'profile/update-profile-address'
    | 'profile/upload-national-images';

type CountEndpoint = '';

type DriverEndpoints =
    | 'driver/create'
    | 'driver/update'
    | 'driver/upload-criminal-record'
    | 'driver/upload-drug-test'
    | 'driver/upload-driver-license'
    | 'driver/create-visa'
    | 'driver/update-visa'
    | 'driver/upload-visa-image'
    | 'driver/upload-driver-passport';

type AgencyEndpoints =
    | 'agency/create'
    | 'agency/update'
    | 'agency/delete'
    | 'agency/find-all'
    | 'agency/find-by-id';

type TrucksEndpoints =
    | 'truck/create'
    | 'truck/update'
    | 'truck/delete'
    | 'truck/find-all'
    | 'truck/upload-license-image'
    | 'truck/upload-truck-image';

type TrailerEndpoints =
    | 'trailer/create'
    | 'trailer/update'
    | 'trailer/delete'
    | 'trailer/find-all'
    | 'trailer/upload-license-image'
    | 'trailer/upload-trailer-image';

type RequestEndpoints =
    | 'request/create'
    | 'request/update'
    | 'request/find-all'
    | 'request/find-by-id'
    | 'request/delete';

export type EndpointsType =
    | AuthEndpoints
    | UserEndpoints
    | CountEndpoint
    | ProfileEndpoints
    | DriverEndpoints
    | AgencyEndpoints
    | TrucksEndpoints
    | TrailerEndpoints
    | RequestEndpoints;
