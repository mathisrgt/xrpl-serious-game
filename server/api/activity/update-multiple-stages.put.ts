import { defineEventHandler, createError, readBody } from 'h3';
import { Client } from 'xrpl';
import { GetClassroomStudents, UpdateStudentGameStages } from '~/server/connectors/mongo';

/**
 * Generate game stages for each student in a classroom.
**/

const generateGameStages = async (client: Client, n: number) => {

// This function creates `n` stages and funds each stage with a new Ripple account. Each stage is assigned a solution accountand is marked as 'not_started'.
  const stages = [];
  for (let i = 1; i <= n; i++) {
    const { wallet } = await client.fundWallet();
    stages.push({
      stage: i,
      solutionAccount: wallet.classicAddress,
      status: 'not_started',
    });
  }
  return stages;
};

/**
 * API endpoint to generate game stages for students in a specified classroom.
**/

export default defineEventHandler(async (event) => {
  // Extract the classroom name and number of stages from the request body
  const { classroomName, numStages } = await readBody(event);

  // Ensure the classroom name and number of stages are provided
  if (!classroomName || !numStages) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Classroom name and number of stages are required',
    });
  }

  // Retrieve the list of students for the specified classroom maybe adding a try catch block here
  const students = await GetClassroomStudents(classroomName);

  // Check if students data was retrieved
  if (!students) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Classroom not found',
    });
  }

  // Initialize the XRPL client to connect to the Ripple test network
  const client = new Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  // Iterate through each student and generate game stages if an account is available
  for (const student of students) {
    if (student.account) {

      // Generate game stages for the student
      const gameStages = await generateGameStages(client, numStages);
      await UpdateStudentGameStages(student.email, gameStages);
    }
  }

  // Disconnect the XRPL client after processing all students
  await client.disconnect();

  return { success: true };
});
