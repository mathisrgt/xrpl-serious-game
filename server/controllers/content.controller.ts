import { defineEventHandler, getQuery, readBody, createError } from 'h3'
import Content from '../models/content.model'

/**
 * Get all content items
 */
export const getAllContents = defineEventHandler(async () => {
  const contents = await Content.find().populate('relatedContents')
  return contents
})

/**
 * Get a specific content by ID
 */
export const getContentById = defineEventHandler(async (event) => {
  const { id } = getQuery(event)

  const content = await Content.findById(id).populate('relatedContents')

  if (!content) {
    throw createError({ statusCode: 404, statusMessage: 'Content not found' })
  }

  return content
})

/**
 * Create a new content item
 */
export const createContent = defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.type) {
    throw createError({ statusCode: 400, statusMessage: 'Name and type are required' })
  }

  const newContent = await Content.create({
    name: body.name,
    description: body.description || '',
    type: body.type,
    relatedContents: body.relatedContents || [],
    data: body.data || []
  })

  return {
    message: 'Content created successfully',
    content: newContent
  }
})

/**
 * Update a content item by ID
 */
export const updateContent = defineEventHandler(async (event) => {
  const { id } = getQuery(event)
  const body = await readBody(event)

  const updatedContent = await Content.findByIdAndUpdate(id, body, { new: true }).populate('relatedContents')

  if (!updatedContent) {
    throw createError({ statusCode: 404, statusMessage: 'Content not found' })
  }

  return {
    message: 'Content updated successfully',
    content: updatedContent
  }
})

/**
 * Delete a content item by ID
 */
export const deleteContent = defineEventHandler(async (event) => {
  const { id } = getQuery(event)

  const deletedContent = await Content.findByIdAndDelete(id)

  if (!deletedContent) {
    throw createError({ statusCode: 404, statusMessage: 'Content not found' })
  }

  return { message: 'Content deleted successfully' }
})
