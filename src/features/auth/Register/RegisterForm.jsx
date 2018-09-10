import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  registerUser,
};

const validate = combineValidators({
  displayName: isRequired('Name'),
  email: isRequired('Email'),
  password: isRequired('Password'),
});

const RegisterForm = props => (
  <div>
    <Form size="large" onSubmit={props.handleSubmit(props.registerUser)}>
      <Segment>
        <Field name="displayName" type="text" component={TextInput} placeholder="Known As" />
        <Field name="email" type="text" component={TextInput} placeholder="Email" />
        <Field name="password" type="password" component={TextInput} placeholder="Password" />
        {props.error && (
          <Label basic color="red">
            {props.error}
          </Label>
        )}
        <Button disabled={props.invalid || props.submitting} fluid size="large" color="teal">
          Register
        </Button>
        <Divider horizontal>OR</Divider>
        <SocialLogin />
      </Segment>
    </Form>
  </div>
);

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
