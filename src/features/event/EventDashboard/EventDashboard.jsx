import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';

const actions = {
  deleteEvent,
};

class EventDashboard extends Component {
  handleDeleteEvents = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvents={this.handleDeleteEvents} events={events} />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
});

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
