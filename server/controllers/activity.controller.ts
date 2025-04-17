import { defineEventHandler, getQuery, readBody, createError } from 'h3';
import Activity from '../models/activity.model';


/**
 * Get all activities
 */
export const getAllActivities = defineEventHandler(async () => {
    const activities = await Activity.find().populate('grades.user').populate('status.user');
    return activities;
});

/**
 * Get a specific activity by ID
 */
export const getActivityById = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    const activity = await Activity.findById(id).populate('grades.user').populate('status.user');

    if (!activity) {
        throw createError({ statusCode: 404, statusMessage: 'Activity not found' });
    }

    return activity;
});

/**
 * Create a new activity
 */
export const createActivity = defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.content) {
        throw createError({ statusCode: 400, statusMessage: 'Activity content is required' });
    }

    const newActivity = await Activity.create({
        content: body.content,
        grades: body.grades || [],
        status: body.status || []
    });

    return {
        message: 'Activity created successfully',
        activity: newActivity
    };
});

/**
 * Update an activity by ID
 */
export const updateActivity = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const body = await readBody(event);

    const updatedActivity = await Activity.findByIdAndUpdate(id, body, { new: true })
        .populate('grades.user')
        .populate('status.user');

    if (!updatedActivity) {
        throw createError({ statusCode: 404, statusMessage: 'Activity not found' });
    }

    return {
        message: 'Activity updated successfully',
        activity: updatedActivity
    };
});

/**
 * Delete an activity by ID
 */
export const deleteActivity = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    const deletedActivity = await Activity.findByIdAndDelete(id);

    if (!deletedActivity) {
        throw createError({ statusCode: 404, statusMessage: 'Activity not found' });
    }

    return { message: 'Activity deleted successfully' };
});
