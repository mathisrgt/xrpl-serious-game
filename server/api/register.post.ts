import { register } from '~/server/controllers/register.controller';

/**
 * API endpoint for user registration.
 */
export default defineEventHandler(async (event) => {
  return await register(event);
});
