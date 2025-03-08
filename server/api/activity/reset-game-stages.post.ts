import { defineEventHandler, createError, readBody } from 'h3';
import { GetClassroomStudents, ResetStudentGameStages } from '~/server/connectors/mongo';


/**
 * API endpoint to reset game stages for all students in a specified classroom.
**/

export default defineEventHandler(async (event) => {

  // Extract the classroom name from the request body
  const { classroomName } = await readBody(event);

  // Validate input: Ensure the classroom name is provided
  if (!classroomName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Classroom name is required'
    });
  }

  // Retrieve the list of students for the specified classroom ( maybe adding a try catch block here)
  const students = await GetClassroomStudents(classroomName);

  // Validate response: Check if students data was retrieved successfully
  if (!students) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Classroom not found'
    });
  }

  // Iterate through each student and reset their game stages
  for (const student of students) {
    await ResetStudentGameStages(student.email);
  }

  // Return a success response if all stages are reset
  return { success: true };
});
