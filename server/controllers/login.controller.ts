import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { useRuntimeConfig } from '#imports';

/**
 * @typedef {Object} LoginRequestBody
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */

/**
 * Logs in a user and returns a JWT token.
 * 
 * @param {H3Event} event - The incoming request event from Nuxt 3.
 * @returns {Promise<Object>} - A success message, user data, and an authentication token, or an error response.
 */
export const login = defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const { email, password } = await readBody(event);
        
        const user = await User.findOne({ email });
        if (!user) {
            return createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '5h' });

        return {
            message: 'Login successful',
            user: user,
            token: token
        };
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Failed to login'
        });
    }
});