import { DeleteClassroom } from '~/server/connectors/mongo'

/**
 * API endpoint to delete a classroom.
**/

export default defineEventHandler(async (event) => {

  // Read the request body, containing the classroom name
  const body = await readBody(event) 
  
  // Call the DeleteClassroom mongo function with the provided classroom name
  return DeleteClassroom(body.name)
})