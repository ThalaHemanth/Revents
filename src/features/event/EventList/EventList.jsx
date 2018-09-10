import React, { Component } from 'react';

import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, onEventOpen, deleteEvents } = this.props;
    return (
      <div>
        <h1>Event List</h1>
        {events &&
          events.map(event => (
            <EventListItem
              deleteEvents={deleteEvents}
              onEventOpen={onEventOpen}
              key={event.id}
              event={event}
            />
          ))}
      </div>
    );
  }
}

export default EventList;
