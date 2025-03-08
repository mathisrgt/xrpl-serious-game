import { defineEventHandler, createError, readBody } from 'h3';
import { Client, Wallet, Payment } from 'xrpl';
import { GetClassroomStudents } from '~/server/connectors/mongo';


/**
 * Sends a payment transaction from a student's account to the specified solution account.
**/ 

export const sendTransaction = async (account: any, solution_account: any) => {

  // Initialize the XRPL client for the Ripple test network
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  try {
    await client.connect();

    // Connect to wallet using the seed
    const wallet = Wallet.fromSeed(account.seed);

    // Define the payment transaction details
    const tx: Payment = {
      TransactionType: "Payment",
      Account: wallet.classicAddress,
      Destination: solution_account.classicAddress,
      Amount: "42"  // 42 drops
    };

    // Submit the transaction and wait for the response
    const result = await client.submitAndWait(tx, {
      autofill: true,
      wallet
    });

    // Disconnect the client after the transaction is processed
    await client.disconnect();

    // Check the transaction result and throw an error if it failed
    if (result.result.meta.TransactionResult !== 'tesSUCCESS') {
      throw new Error(`Transaction failed: ${result.result.meta.TransactionResult}`);
    }
    return result;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
};


/**
 * API endpoint to send payment transactions to students in a specified classroom.
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

    // Iterate through each student and send a payment transaction if they have valid accounts
    for (const student of students) {
      if (student.account && student.solution_account) {
        await sendTransaction(student.account, student.solution_account);
      }
    }

    // Return a success response if all transactions were processed
    return { success: true };
  } catch (error) {
    console.error('Error sending transactions:', error);

    // Throw a 500 error if there was a failure in processing transactions
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send transactions'
    });
  }
});
