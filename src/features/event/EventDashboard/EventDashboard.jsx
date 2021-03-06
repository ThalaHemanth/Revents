import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const actions = {
  deleteEvent,
};

class EventDashboard extends Component {
  handleDeleteEvents = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) {
      return <LoadingComponent inverted />;
    }
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvents={this.handleDeleteEvents} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading,
});

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
