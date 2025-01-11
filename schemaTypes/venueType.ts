import { defineField, defineType } from 'sanity'
import { MarkerIcon } from '@sanity/icons'

export const venueType = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: MarkerIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'neighborhood',
      type: 'reference',
      to: [{ type: 'neighborhood' }],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'address',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'website',
      type: 'url',
      validation: (Rule) => [
        Rule.required(),
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        })
      ]
    }),
  ],
})