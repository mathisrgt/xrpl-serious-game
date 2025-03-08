import { AddClassroom } from '~/server/connectors/mongo'

/**
 * API endpoint to add a new classroom.
**/

export default defineEventHandler(async (event) => {
  // Read the request body which should contain the classroom information
  const classroomInfo = await readBody(event)
  
  // Call the mongo function to add the new classroom
  return AddClassroom(classroomInfo) 
})