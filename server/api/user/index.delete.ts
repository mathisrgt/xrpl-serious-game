import { DeleteUser, User } from '~/server/connectors/mongo'

/**
 * API endpoint handler to delete a user from the database based on their email.
*/

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
    
  return DeleteUser(body.email)
})