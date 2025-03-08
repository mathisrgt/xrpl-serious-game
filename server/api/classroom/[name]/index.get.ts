import { GetClassroomStudents} from '~/server/connectors/mongo'

/**
 * API endpoint to retrieve students from a specific classroom.
**/

export default defineEventHandler(async (event) => {

    // Extract the classroom name from the route parameters
    const { name } = getRouterParams(event)

    const userInfo = event.context.user;

    // Check if the user is authorized (either admin or teacher role)
    if (!userInfo || !['admin', 'teacher'].includes(userInfo.role)) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
        })
      }

    // Fetch the students from the classroom
    const students = await GetClassroomStudents(name);
    if (!students) {
      console.error('Error getting students:');
    }
    return students;
  });

