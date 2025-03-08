import { login } from '~/server/controllers/login.controller';

/**
 * API endpoint for user login.
 */
export default defineEventHandler(async (event) => {
  return await login(event);
});
