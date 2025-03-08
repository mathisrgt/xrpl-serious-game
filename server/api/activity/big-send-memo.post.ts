import { defineEventHandler, createError, readBody } from 'h3';
import { Client, Wallet, xrpToDrops, convertStringToHex } from 'xrpl';
import { GetClassroomStudents } from '~/server/connectors/mongo';


/**
 * API endpoint to send transactions to students in a specified classroom.
**/

export default defineEventHandler(async (event) => {
  // Read the request body and extract the classroom name
  const { classroomName } = await readBody(event);

  if (!classroomName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Classroom name is required'
    });
  }

  // Fetch the list of students for the specified classroom
  const students = await GetClassroomStudents(classroomName);

  // Check if students data was retrieved successfull
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

  // Iterate through each student in the classroom
  for (const student of students) {
    if (student.account) {

      // Iterate through each stage for the student
      for (let stage = 1; stage <= student.numStages; stage++) {
        const solutionAccount = student[`solution_account_${stage}`];

        // Check if a solution account exists for the current stage
        if (solutionAccount) {
          const memo = `Stage ${stage}: Send a transaction to your solution account: ${solutionAccount.classicAddress}`;
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

          // Submit the transaction and handle the response
          try {
            const result = await client.submitAndWait(transaction, { wallet: tempWallet });
            if (result.result.meta.TransactionResult !== 'tesSUCCESS') {
              console.error(`Failed to send transaction for student ${student.email} at stage ${stage}:`, result.result.meta.TransactionResult);
            } else {
              console.log(`Transaction successful for student ${student.email} at stage ${stage}:`, result.result.hash);
            }
          } catch (error) {
            console.error(`Failed to send transaction for student ${student.email} at stage ${stage}:`, error);
          }
        }
      }
    }
  }

  // Disconnect the XRPL client after processing all transactions
  await client.disconnect();

  return { success: true };
});
