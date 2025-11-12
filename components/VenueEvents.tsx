import React from 'react'
import { Card, Stack, Text, Box, Flex, Heading } from '@sanity/ui'
import { useClient } from 'sanity'
import { IntentLink } from 'sanity/router'

interface VenueEventsProps {
  venueId: string
}

interface Event {
  _id: string
  name: string
  startDate: string
  endDate: string
  website?: string
}

export function VenueEvents({ venueId }: VenueEventsProps) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Query for events that reference this venue (handles both draft and published references)
    const query = `*[_type == "event" && (venue._ref == $venueId || venue._ref == $draftVenueId)] | order(startDate desc) {
      _id,
      name,
      startDate,
      endDate,
      website
    }`

    const draftVenueId = `drafts.${venueId}`

    client
      .fetch(query, { venueId, draftVenueId })
      .then((data) => {
        setEvents(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching events:', error)
        setLoading(false)
      })
  }, [venueId, client])

  if (loading) {
    return (
      <Card padding={4} radius={2} shadow={1}>
        <Text>Loading events...</Text>
      </Card>
    )
  }

  if (events.length === 0) {
    return (
      <Card padding={4} radius={2} shadow={1}>
        <Text muted>No events found for this venue.</Text>
      </Card>
    )
  }

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Heading size={1}>Events at this venue ({events.length})</Heading>
        <Stack space={3}>
          {events.map((event) => (
            <Card key={event._id} padding={3} radius={2} shadow={1} tone="default">
              <Stack space={2}>
                <Flex justify="space-between" align="center">
                  <Text weight="semibold">
                    <IntentLink
                      intent="edit"
                      params={{id: event._id.replace('drafts.', ''), type: 'event'}}
                    >
                      {event.name}
                    </IntentLink>
                  </Text>
                </Flex>
                <Text size={1} muted>
                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </Text>
                {event.website && (
                  <Box>
                    <Text size={1}>
                      <a href={event.website} target="_blank" rel="noopener noreferrer">
                        Visit website →
                      </a>
                    </Text>
                  </Box>
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}
