import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import cuid from 'cuid';

import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const eventsDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
    ],
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
    ],
  },
];

class EventDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: eventsDashboard,
      isOpen: false,
      selectedEvent: null,
    };
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true, selectedEvent: null });
  };

  handleFormCancel = () => {
    this.setState({ isOpen: !true });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    const updatedEvents = [...this.state.events, newEvent];
    this.setState({
      events: updatedEvents,
    });
  };

  handleEventOpen = editEvent => () => {
    this.setState({
      selectedEvent: editEvent,
      isOpen: true,
    });
  };

  handleUpdateEvent = updatedEvent => {
    const { events } = this.state;
    this.setState({
      events: events.map(event => {
        if (event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent);
        }
        return event;
      }),
      isOpen: false,
      selectedEvent: null,
    });
  };

  handleDeleteEvents = eventid => () => {
    const { events } = this.state;
    const updatedEvents = events.filter(event => event.id !== eventid);
    this.setState({ events: updatedEvents });
  };

  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvents={this.handleDeleteEvents}
            onEventOpen={this.handleEventOpen}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          {isOpen && (
            <EventForm
              handleCreateEvent={this.handleCreateEvent}
              handleCancel={this.handleFormCancel}
              selectedEvent={selectedEvent}
              updateEvent={this.handleUpdateEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
