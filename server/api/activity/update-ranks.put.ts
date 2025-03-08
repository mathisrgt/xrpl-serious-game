import { defineEventHandler, createError, readBody } from 'h3';
import { UpdateRanks } from '~/server/connectors/mongo'; 

/**
 * API endpoint to update the ranks of students in a specified classroom.
 * This function is called when the ranks need to be updated.
 */
export default defineEventHandler(async (event) => {
  try {
    // Extract the classroom name from the request body
    const { classroomName } = await readBody(event);

    // Call the UpdateRanks function to update the ranks of students in the specified classroom
    const updatedStudents = await UpdateRanks(classroomName);
    return { success: true, updatedStudents };
  } catch (error) {
    console.error('Erreur lors de la mise à jour des rangs des étudiants:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Échec de la mise à jour des rangs des étudiants',
    });
  }
});

