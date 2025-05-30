import { Content, GenerateMemoResponse } from '~/types/content.types'
import { defineEventHandler, readBody, createError } from 'h3'

/**
 * Generate an interactive activity with an external server and return the generated data
 */
export const generate = defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.type || !body.contentId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing type or contentId'
    })
  }

  // Fetch related content
  let content: Content
  try {
    const response = await $fetch(
      `/api/content?id=${body.contentId}`
    )
    content = response[0] as Content
  } catch (err) {
    console.error('❌ Failed to fetch content:', err)
    throw createError({ statusCode: 500, statusMessage: 'Could not fetch content' })
  }

  // Call external server
  let generated: GenerateMemoResponse
  try {
    const response = await $fetch<{ success: boolean; data: GenerateMemoResponse }>(
      `http://localhost:8080/${body.type}/generate`,
      {
        method: 'POST'
      }
    )
    generated = response.data
  } catch (err) {
    console.error('❌ Failed to generate activity:', err)
    throw createError({ statusCode: 502, statusMessage: 'Could not generate activity' })
  }

  // Return combined data
  return {
    success: true,
    content,
    generated
  }
})
