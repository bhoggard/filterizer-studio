import { defineField, defineType } from 'sanity'

export const neighborhoodType = defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: rule => rule.required()
    })
  ],
})