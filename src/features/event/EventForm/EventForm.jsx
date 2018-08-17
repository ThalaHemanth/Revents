import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { connect } from 'react-redux';

import { createEvent, updateEvent } from '../eventActions';

const actions = {
  createEvent,
  updateEvent,
};

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: Object.assign({}, this.props.event),
    };
  }

  onInputChange = event => {
    const newEvent = this.state.event;
    newEvent[event.target.name] = event.target.value;
    this.setState({
      event: newEvent,
    });
  };

  onFormSubmit = evnt => {
    const { event } = this.state;
    evnt.preventDefault();
    if (event.id) {
      this.props.updateEvent(event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  render() {
    const { event } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              value={event.title}
              onChange={this.onInputChange}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              value={event.date}
              onChange={this.onInputChange}
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={event.city}
              onChange={this.onInputChange}
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={event.venue}
              onChange={this.onInputChange}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={event.hostedBy}
              onChange={this.onInputChange}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.handleCancel} type="submit">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: '',
  };
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    event,
  };
};

export default connect(
  mapStateToProps,
  actions
)(EventForm);
