import { AddStudentToClassroom } from '~/server/connectors/mongo';

/**
 * API endpoint to add a student to a specific classroom.
**/

export default defineEventHandler(async (event) => {
    try {

    // Extract the classroom name from the route parameters
    const { name : classroomName } = getRouterParams(event)

    // Retrieve user information from the event context
    const userInfo = event.context.user;

    // Check if the user is authorized (either admin or teacher role)
    if (!userInfo || !['admin', 'teacher'].includes(userInfo.role)) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
        })
      }

    // Read the student data (name and email) from the request body
    const { name, email } = await readBody(event);

    // Student object to be added to the classroom
    const student = {
        name,
        email,
        rank: undefined, 
        account: undefined, 
        solution_account: undefined, 
      };

    // Call the mongo function to add the student to the classroom
    await AddStudentToClassroom(classroomName, student);
    } catch (error) {
      console.error('Error adding student to classroom:', error);
    }
});
      
