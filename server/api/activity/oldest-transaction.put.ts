import { defineEventHandler, createError, readBody } from 'h3';
import { Client } from 'xrpl';
import { GetClassroomStudents, UpdateStudentOldestTransaction } from '~/server/connectors/mongo';


/**
 * Fetches the oldest transaction date between a solution account and a personal account.
**/

const getOldestTransaction = async (soluce_account: string, personal_account: string) => {

  // Initialize the XRPL client for the Ripple test network
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  // Define the request payload for fetching account transactions (Maybe adding a try catch block here)
  const request = {
    command: 'account_tx',
    account: soluce_account,
    ledger_index_min: -1,
    ledger_index_max: -1,
    limit: 100,
  }

  // Execute the request to the XRPL client
  const response = await client.request(request);
  await client.disconnect();

  // Filter transactions originating from the student's personal account
  const transactions = response.result.transactions.filter(tx => tx.tx.Account === personal_account);

  // Find the oldest transaction based on the transaction date
  const oldestTransaction = transactions.reduce((oldest, tx) => {
    return !oldest || tx.tx.date < oldest.tx.date ? tx : oldest;
  }, null);

  // Return the date of the oldest transaction or `null` if no transactions are found
  return oldestTransaction ? oldestTransaction.tx.date : null;
};


/**
 * API endpoint to update the oldest transaction date for students in a specified classroom.
**/

export default defineEventHandler(async (event) => {
  try {
    // Extract the classroom name from the request body
    const { classroomName } = await readBody(event);

    // Retrieve the list of students for the specified classroom
    const students = await GetClassroomStudents(classroomName);

    // Check if students data was retrieved successfully
    if (!students) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Classroom not found'
      });
    }

    // Iterate through each student and fetch the oldest transaction date
    for (const student of students) {
      if (student.account && student.solution_account) {
        const oldestTransactionDate = await getOldestTransaction(student.solution_account.classicAddress, student.account.classicAddress);

        // If an oldest transaction date is found, update the student's record
        if (oldestTransactionDate) {
          await UpdateStudentOldestTransaction(student.email, oldestTransactionDate);
        }
      }
    }

    // Return a success response if all updates are completed
    return { success: true };
  } catch (error) {
    console.error('Error updating oldest transactions:', error);

    // Throw a 500 error if there was a failure in the process
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update oldest transactions'
    });
  }
});
