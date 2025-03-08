// classrooms/[name].reset-accounts.post.ts
import { ResetStudentAccounts } from '~/server/connectors/mongo';

export default defineEventHandler(async (event) => {
    
      // Read the request body, containing the classroom name
      const { name } = getRouterParams(event);
      if (!name) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Classroom name is required',
        });
      }
      
       const userInfo = event.context.user;
       console.log('name', name)

      // Check if the user is authorized (either admin or teacher role)
      if (!userInfo || !['admin', 'teacher'].includes(userInfo.role)) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
          })
        }
      // Reset the accounts for the classroom
      try {
        await ResetStudentAccounts(name);
        console.log('Student accounts reset successfully');
        return { success: true, message: `Accounts reset for classroom ${name}` };
      } catch (error) {
        console.error('Error resetting student accounts:', error);
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        });
      }
    });      
