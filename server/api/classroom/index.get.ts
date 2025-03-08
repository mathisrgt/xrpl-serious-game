import { ListClassrooms } from '~/server/connectors/mongo'

/**
 * API endpoint to list classrooms.
**/

export default defineEventHandler(async (event) => {

  // Extract user information from the request context
  const userInfo = event.context.user

  // Check if the user is authorized (must be an admin or teacher)
  if (!userInfo || !['admin', 'teacher'].includes(userInfo.role)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  // Return the list of classrooms based on the user's role
  if (userInfo.role === 'admin') {
    // Admins receive the full list of classrooms
    return ListClassrooms()
  } else if (userInfo.role === 'teacher') {
    // Teachers receive only the classrooms associated with their email
    return ListClassrooms(userInfo.email as string)
  }
})