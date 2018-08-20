import React, { Component } from 'react';
import { Form, Button, Segment, Grid, Header } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import cuid from 'cuid';
import { connect } from 'react-redux';
import moment from 'moment';

import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

const actions = {
  createEvent,
  updateEvent,
};

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
  title: isRequired({ message: 'Please Provide Event Name' }),
  category: isRequired({ message: 'Please Choose A Event Categoty' }),
  description: composeValidators(
    isRequired({ message: 'Please Describe About Your Event' }),
    hasLengthGreaterThan(4)({ message: 'Description needs to be atleast 5 characters' })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
});

class EventForm extends Component {
  onFormSubmit = values => {
    values.date = moment(values.date).format();
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Header sub color="teal" content="Event Details" />
              <Field name="title" type="text" component={TextInput} placeholder="Name Your Event" />
              <Field
                name="category"
                type="text"
                multiple={false}
                options={category}
                component={SelectInput}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                rows={3}
                component={TextArea}
                placeholder="Tell Us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field name="city" type="text" component={TextInput} placeholder="Event City" />
              <Field name="venue" type="text" component={TextInput} placeholder="Event Venue" />
              <Field
                name="date"
                type="text"
                component={DateInput}
                placeholder="Date and Time of the Event"
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.handleCancel} type="submit">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    initialValues: event,
  };
};

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm));
