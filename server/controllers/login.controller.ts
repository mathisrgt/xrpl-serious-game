import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { useRuntimeConfig } from '#imports';
import { setCookie } from 'h3';

export const login = defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { email, password } = await readBody(event);

    const user = await User.findOne({ email });
    if (!user) {
        console.log(`❌ User ${email} not found`);
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, config.jwtSecret, { expiresIn: '5h' });

    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 5
    });

    return {
        message: 'Login successful',
        token,
        user: {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        }
    };
});
