// api\src\config\cookies.config.ts

import { CookieOptions } from 'express';

export const Cookies: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax', //"strict" | "lax" | "none"
    path: '/',
    // ...(production && { domain: '.domain.net', secure: true }),
};
