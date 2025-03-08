import { defineEventHandler, createError, readBody } from 'h3';
import { Client, Wallet, xrpToDrops, convertStringToHex } from 'xrpl';
import { GetClassroomStudents } from '~/server/connectors/mongo';

/**
 * API endpoint to send XRP transactions to students in a specified classroom.
**/

export default defineEventHandler(async (event) => {
  // Extract the classroom name from the request body
  const { classroomName } = await readBody(event);

  // Ensure the classroom name is provided
  if (!classroomName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Classroom name is required'
    });
  }

  // Retrieve the list of students for the specified classroom
  const students = await GetClassroomStudents(classroomName);

  // Check if students data was retrieved
  if (!students) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Classroom not found'
    });
  }

  // Initialize the XRPL client to connect to the Ripple test network
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  // Create a temporary wallet with funds
  const { wallet: tempWallet } = await client.fundWallet();

  // Iterate through each student in the classroom and send a transaction if accounts are available
  for (const student of students) {
    if (student.account && student.solution_account) {
       // Construct memo message with the student's solution account address
      const memo = `Send a transaction to your solution account: ${student.solution_account.classicAddress}`;
      const memoHex = convertStringToHex(memo);

      // Define the payment transaction details
      const transaction = {
        TransactionType: "Payment",
        Account: tempWallet.classicAddress,
        Destination: student.account.classicAddress,
        Amount: xrpToDrops("10"), // Amount in drops
        Memos: [
          {
            Memo: {
              MemoData: memoHex
            }
          }
        ]
      };

      try {
        // Submit the transactiont
        const result = await client.submitAndWait(transaction, { wallet: tempWallet });

        // Check the result and log success or failure
        if (result.result.meta.TransactionResult !== 'tesSUCCESS') {
          console.error(`Failed to send transaction for student ${student.email}:`, result.result.meta.TransactionResult);
        } else {
          console.log(`Transaction successful for student ${student.email}:`, result.result.hash);
        }
      } catch (error) {
        console.error(`Failed to send transaction for student ${student.email}:`, error);
      }
    }
  }

  await client.disconnect();

  return { success: true };
});
