import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { useRuntimeConfig } from '#imports';
import { setCookie } from 'h3';

/**
 * Registers a new user in the system and returns user data.
 */
export const register = defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body = await readBody(event);
        console.log('Received registration request with body:', body);

        const { firstName, lastName, email, password, role } = body;

        if (!firstName || !lastName || !email || !password || !role) {
            throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw createError({ statusCode: 400, statusMessage: 'User already exists' });
        }

        const newUser = new User({ firstName, lastName, email, password, role });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, email: newUser.email, role: newUser.role }, config.jwtSecret, { expiresIn: '5h' });

        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 5
        });

        return {
            message: 'User registered successfully',
            user: {
                id: newUser._id.toString(),
                email: newUser.email,
                role: newUser.role
            }
        };
    } catch (error: any) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to register user' });
    }
});
