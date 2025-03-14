import { defineEventHandler, getQuery, readBody, createError } from 'h3';
import User from '../models/user.model';

/**
 * Get all users
 */
export const getAllUsers = defineEventHandler(async () => {
    const users = await User.find().select('-password'); // Exclude password
    return users;
});

/**
 * Get a specific user by ID
 */
export const getUserById = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    const user = await User.findById(id).select('-password');

    if (!user) {
        throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    return user;
});

/**
 * Update a user by ID
 */
export const updateUser = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const body = await readBody(event);

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true }).select('-password');

    if (!updatedUser) {
        throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    return {
        message: 'User updated successfully',
        user: updatedUser
    };
});

/**
 * Delete a user by ID
 */
export const deleteUser = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    return { message: 'User deleted successfully' };
});
