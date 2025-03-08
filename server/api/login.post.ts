import { login } from '~/server/controllers/login.controller';
import { setCookie } from 'h3';

/**
 * API endpoint for user login.
 */
export default defineEventHandler(async (event) => {
    const response = await login(event);

    if (response.token) {
        setCookie(event, 'auth_token', response.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 3600, // 1 hour
        });
    }

    return response;
});
