import { defineField, defineType } from 'sanity'
import { MarkerIcon } from '@sanity/icons'
import { VenueEventsField } from '../components/VenueEventsField'

export const venueType = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: MarkerIcon,
  components: {
    input: VenueEventsField,
  },
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