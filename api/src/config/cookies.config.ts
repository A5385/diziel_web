import { CookieOptions } from 'express';

const production = process.env.NODE_ENV === 'production';
export function cookiesOptions(): CookieOptions {
    return {
        httpOnly: true,
        sameSite: 'lax', //"strict" | "lax" | "none"
        // maxAge,
        path: '/',
        ...(production && { domain: '.logixn.net', secure: true }),
    };
}
