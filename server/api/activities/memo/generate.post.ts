import { generateMemoActivity } from '~/server/services/memo-activity'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, description, students } = body
  if (!name || !students) {
    throw createError({ statusCode: 400, statusMessage: 'Missing name or students' })
  }

  const activity = await generateMemoActivity(name, description, students)
  return { success: true, activity }
})
