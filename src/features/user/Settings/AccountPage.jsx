import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired, composeValidators, matchesField } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Password Required' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Please Confirm your new Password' }),
    matchesField('newPassword1')({ message: 'Password do not match' })
  )(),
});

const Account = ({ error, submitting, invalid, handleSubmit, updatePassword, providerId }) => (
  <Segment>
    <Header dividing size="large" content="Account" />
    {providerId &&
      providerId === 'password' && (
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to update your account settings</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline
              component={TextInput}
              basic
              placeholder="New Password"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline
              basic
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Divider />
            <Button
              disabled={submitting || invalid}
              size="large"
              positive
              content="Update Password"
            />
          </Form>
        </div>
      )}
    {providerId &&
      providerId === 'facebook.com' && (
        <div>
          <Header color="teal" sub content="Facebook Account" />
          <p>Please visit Facebook to update your account settings</p>
          <Button type="button" color="facebook">
            <Icon name="facebook" />
            Go to Facebook
          </Button>
        </div>
      )}
    {providerId &&
      providerId === 'google.com' && (
        <div>
          <Header color="teal" sub content="Google Account" />
          <p>Please visit Google to update your account settings</p>
          <Button type="button" color="google plus">
            <Icon name="google plus" />
            Go to Google
          </Button>
        </div>
      )}
  </Segment>
);

export default reduxForm({ form: 'account', validate })(Account);
