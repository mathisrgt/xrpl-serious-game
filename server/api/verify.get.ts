import jwt from 'jsonwebtoken';
import { getSecretKeyForUser } from '~/server/connectors/mongo';
import { getCookie } from 'h3';

const SECRET_KEY_BASE = process.env.SECRET_KEY_BASE;

/**
 * API endpoint handler for verifying a user's JWT token.
*/

export default defineEventHandler(async (event) => {
  try {
    // Retrieve the JWT token from cookies
    const token = getCookie(event, 'auth_token');
    if (!token) {
      throw new Error('No token provided');
    }

    // Decode the token to extract email and role
    const decodedToken = jwt.decode(token) as { email: string; role: string };
    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    // Retrieve the unique secret key for the user from the database
    const uniqueSecretKey = await getSecretKeyForUser(decodedToken.email);
    if (!uniqueSecretKey) {
      throw new Error('Unauthorized');
    }

    // Verify the token using the base secret key and the unique secret key for the user
    jwt.verify(token as string, `${SECRET_KEY_BASE}${uniqueSecretKey}`);

    // If successful, return the decoded token data
    return {
      success: true,
      email: decodedToken.email,
      role: decodedToken.role ,
      token : decodedToken
    };
  } catch (error) {
    // Handle any errors and log them
    console.error('Token verification error:', error);
    return {
      success: false,
      message: 'Unauthorized'
    };
  }
});