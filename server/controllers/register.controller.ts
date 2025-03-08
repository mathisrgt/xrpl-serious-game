import User from '../models/user.model';

/**
 * @typedef {Object} RegisterRequestBody
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password (hashed before saving).
 * @property {"student" | "teacher"} role - The role of the user, either "student" or "teacher".
 */

/**
 * Registers a new user in the system.
 * 
 * @param {H3Event} event - The incoming request event from Nuxt 3.
 * @returns {Promise<Object>} - A success message and user data or an error response.
 */
export const register = defineEventHandler(async (event) => {
    try {
        const { firstName, lastName, email, password, role } = await readBody(event);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return createError({
                statusCode: 400,
                statusMessage: 'User already exists'
            });
        }

        const newUser = new User({ firstName, lastName, email, password, role });
        await newUser.save();

        return {
            message: 'User registered successfully',
            user: newUser
        };
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Failed to register user'
        });
    }
});
