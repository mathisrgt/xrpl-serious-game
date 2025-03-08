import { ListUsers, User , ListUsersTeacher , ListUsersStudent} from '~/server/connectors/mongo'

/**
 * API endpoint handler to list users.
*/

export default defineEventHandler(async (event) => {

  // Get the user information from the context
  const userInfo = event.context.user

  // Check the role of the user and fetch the list of users accordingly
  if (userInfo.role === 'admin') {
    // Admin: Return the entire list of users
    return ListUsers()
  } else if (userInfo.role === 'teacher') {
    // Teacher: Return a list of users associated with the teacher
    return ListUsersTeacher(userInfo.email as string)
  }
  else if (userInfo.role === 'student') {
    return ListUsersStudent(userInfo.email as string);
    }
})