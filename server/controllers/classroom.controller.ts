import mongoose from 'mongoose';
import Classroom from '../models/classroom.model';
import User from '../models/user.model';
import { defineEventHandler, readBody, getQuery, createError } from 'h3';

/**
 * Create a new classroom
 */
export const createClassroom = defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.name) {
        throw createError({ statusCode: 400, statusMessage: 'Classroom name is required' });
    }

    const newClassroom = await Classroom.create({
        name: body.name,
        users: body.users || []
    });

    return {
        message: 'Classroom created successfully',
        classroom: newClassroom
    };
});

/**
 * Get all classrooms
 */
export const getAllClassrooms = defineEventHandler(async () => {
    const classrooms = await Classroom.find().populate('users');
    return classrooms;
});

/**
 * Get a single classroom by ID
 */
export const getClassroomById = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    const classroom = await Classroom.findById(id).populate('users');

    if (!classroom) {
        throw createError({ statusCode: 404, statusMessage: 'Classroom not found' });
    }

    return classroom;
});

/**
 * Update a classroom by ID
 */
export const updateClassroom = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const body = await readBody(event);

    const updatedClassroom = await Classroom.findByIdAndUpdate(id, body, { new: true });

    if (!updatedClassroom) {
        throw createError({ statusCode: 404, statusMessage: 'Classroom not found' });
    }

    return {
        message: 'Classroom updated successfully',
        classroom: updatedClassroom
    };
});

/**
 * Delete a classroom by ID
 */
export const deleteClassroom = defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    console.log("Deleting classroom: ", id);

    const deletedClassroom = await Classroom.findByIdAndDelete(id);

    if (!deletedClassroom) {
        throw createError({ statusCode: 404, statusMessage: 'Classroom not found' });
    }

    return {
        message: 'Classroom deleted successfully'
    };
});

/**
 * Add a student to a classroom
 */
export const addStudentToClassroom = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const body = await readBody(event);

    if (!body.studentId) {
        throw createError({ statusCode: 400, statusMessage: 'Student ID is required' });
    }

    const classroom = await Classroom.findById(id);
    if (!classroom) {
        throw createError({ statusCode: 404, statusMessage: 'Classroom not found' });
    }

    const student = await User.findById(body.studentId);
    if (!student) {
        throw createError({ statusCode: 404, statusMessage: 'Student not found' });
    }

    if (!classroom.users.includes(body.studentId)) {
        classroom.users.push(body.studentId);
        await classroom.save();
    }

    return {
        message: 'Student added successfully',
        classroom
    };
});

/**
 * Remove a student from a classroom
 */
export const removeStudentFromClassroom = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const body = await readBody(event);

    if (!body.studentId) {
        throw createError({ statusCode: 400, statusMessage: 'Student ID is required' });
    }

    const classroom = await Classroom.findById(id);
    if (!classroom) {
        throw createError({ statusCode: 404, statusMessage: 'Classroom not found' });
    }

    classroom.users = classroom.users.filter(userId => userId.toString() !== body.studentId);
    await classroom.save();

    return {
        message: 'Student removed successfully',
        classroom
    };
});
