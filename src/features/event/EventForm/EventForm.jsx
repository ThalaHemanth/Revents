import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: '',
};

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: emptyEvent,
    };
  }

  componentDidMount() {
    const { selectedEvent } = this.props;
    if (selectedEvent !== null) {
      this.setState({
        event: selectedEvent,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedEvent } = this.props;
    if (nextProps.selectedEvent !== selectedEvent) {
      this.setState({
        event: nextProps.selectedEvent,
      });
    }
  }

  onInputChange = event => {
    const newEvent = this.state.event;
    newEvent[event.target.name] = event.target.value;
    this.setState({
      event: newEvent,
    });
  };

  onFormSubmit = evnt => {
    const { handleCreateEvent, updateEvent } = this.props;
    const { event } = this.state;
    evnt.preventDefault();
    if (event.id) {
      updateEvent(event);
    } else {
      handleCreateEvent(event);
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

export default EventForm;
