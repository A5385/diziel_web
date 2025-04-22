import { JwtPayload } from './jwtPayload.type';

export type JwtPayloadWithRt = JwtPayload & { refresh_token: string };
