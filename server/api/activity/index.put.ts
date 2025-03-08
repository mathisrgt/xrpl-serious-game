import { Client } from "xrpl";
import { defineEventHandler, createError, readBody } from 'h3';
import { UpdateStudentAccounts, GetClassroomStudents } from '~/server/connectors/mongo';

/**
 * Generates Ripple test accounts using the XRPL test network.
**/

export const generateRippleAccounts = async () => {

  // Initialize the XRPL client for the Ripple test network
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  try {
    await client.connect();

    // Fund two new wallets (accounts) with test XRP ( Solution account and main account)
    const { wallet: wallet1 } = await client.fundWallet();
    const { wallet: wallet2 } = await client.fundWallet();

    // Disconnect the client after generating accounts
    await client.disconnect();

    // Return both the main account and the solution account details
    return {
      account: {
        classicAddress: wallet1.classicAddress,
        seed: wallet1.seed
      },
      solution_account: {
        classicAddress: wallet2.classicAddress,
        seed: wallet2.seed
      }
    };
  } catch (error) {
    console.error('Error generating Ripple accounts:', error);
    throw error;
  }
};

/**
 * API endpoint to generate Ripple accounts for students in a specified classroom.
**/

export default defineEventHandler(async (event) => {
  try {
    // Extract the classroom name from the request body
    const { classroomName } = await readBody(event);

    // Retrieve the list of students for the specified classroom
    const students = await GetClassroomStudents(classroomName);

    // Iterate through each student and generate Ripple accounts and update the database
    for (const student of students) {
      const accounts = await generateRippleAccounts();
      await UpdateStudentAccounts(student.email, accounts.account, accounts.solution_account);
    }

    // Return a success response if all accounts were generated and updated
    return { success: true };
  } catch (error) {
    console.error('Error generating and updating Ripple accounts:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate and update Ripple accounts',
    });
  }
});
