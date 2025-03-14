import { defineEventHandler, getQuery, readBody, createError } from 'h3';
import Course from '../models/course.model';

/**
 * Get all courses
 */
export const getAllCourses = defineEventHandler(async () => {
    const courses = await Course.find().populate('classrooms').populate('activities');
    return courses;
});

/**
 * Get a specific course by ID
 */
export const getCourseById = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    const course = await Course.findById(id).populate('classrooms').populate('activities');

    if (!course) {
        throw createError({ statusCode: 404, statusMessage: 'Course not found' });
    }

    return course;
});

/**
 * Create a new course
 */
export const createCourse = defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.title) {
        throw createError({ statusCode: 400, statusMessage: 'Course title is required' });
    }

    const newCourse = await Course.create({
        title: body.title,
        description: body.description || '',
        classrooms: body.classrooms || [],
        activities: body.activities || [],
        documents: body.documents || []
    });

    return {
        message: 'Course created successfully',
        course: newCourse
    };
});

/**
 * Update a course by ID
 */
export const updateCourse = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const body = await readBody(event);

    const updatedCourse = await Course.findByIdAndUpdate(id, body, { new: true })
        .populate('classrooms')
        .populate('activities');

    if (!updatedCourse) {
        throw createError({ statusCode: 404, statusMessage: 'Course not found' });
    }

    return {
        message: 'Course updated successfully',
        course: updatedCourse
    };
});

/**
 * Delete a course by ID
 */
export const deleteCourse = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
        throw createError({ statusCode: 404, statusMessage: 'Course not found' });
    }

    return { message: 'Course deleted successfully' };
});
