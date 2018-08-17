import React from 'react';
import { Segment, List, Item, Label } from 'semantic-ui-react';

const isHost = false;

const EventDetailedSidebar = ({ event }) => (
  <div>
    <Segment
      textAlign="center"
      style={{ border: 'none' }}
      attached="top"
      secondary
      inverted
      color="teal"
    >
      {event.attendees && event.attendees.length}{' '}
      {event.attendees && event.attendees.length === 1 ? 'Person' : 'People'} Going
    </Segment>
    <Segment attached>
      <List relaxed divided>
        {event.attendees.map(attendee => (
          <Item key={attendee.id} style={{ position: 'relative' }}>
            {isHost && (
              <Label style={{ position: 'absolute' }} color="orange" ribbon="right">
                Host
              </Label>
            )}
            <Item.Image size="tiny" src={`${attendee.photoURL}`} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <a>{attendee.name}</a>
              </Item.Header>
            </Item.Content>
          </Item>
        ))}
      </List>
    </Segment>
  </div>
);

export default EventDetailedSidebar;
