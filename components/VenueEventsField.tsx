import React from 'react'
import { ObjectInputProps, useFormValue } from 'sanity'
import { VenueEvents } from './VenueEvents'

export function VenueEventsField(props: ObjectInputProps) {
  const documentId = useFormValue(['_id']) as string
  const venueId = documentId?.replace('drafts.', '') || ''

  return (
    <>
      {props.renderDefault(props)}
      {venueId && <VenueEvents venueId={venueId} />}
    </>
  )
}
