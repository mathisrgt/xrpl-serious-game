import { setCookie, readBody } from 'h3'; 
import { setSecretKeyForUser } from '~/server/connectors/mongo';
import jwt from 'jsonwebtoken';

/**
 * API endpoint handler for logging out a user.
 *
 * This handler is responsible for logging out a user by:
 * 1. Retrieving the authentication token (`auth_token`) from the cookies.
 * 2. Decoding and verifying the token.
 * 3. Removing the secret key associated with the user to invalidate their session.
 * 4. Clearing the `auth_token` cookie to log out the user.
 */

export default defineEventHandler(async (event) => {
    try {
      // Retrieve the JWT token from the cookies
      const token = getCookie(event, 'auth_token');
      if (!token) {
        throw new Error('No token provided');
      }

      // Decode the token to extract the email and role
      const decodedToken = jwt.decode(token) as { email: string; role: string };
      if (!decodedToken) {
        throw new Error('Invalid token');
      }

      // If a valid email is found in the decoded token, reset the user's secret key
      if (decodedToken.email) {
        await setSecretKeyForUser(decodedToken.email, '');
      }

      // Clear the authentication token cookie by setting its maxAge to 0
      setCookie(event, 'auth_token', token, {
        maxAge: 0,
        path: '/',
        sameSite: 'none',
        secure: true
        }); 

        // Return success response
        return {
            success: true,
        };
        
    } catch (error) {
      console.error('Error logging out:', error);
      return { message: 'Error logging out' };
    }
})