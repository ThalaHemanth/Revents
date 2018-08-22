import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { loginUser } from '../authActions';

const actions = {
  loginUser,
};

const LoginForm = props => (
  <Form error size="large" onSubmit={props.handleSubmit(props.loginUser)}>
    <Segment>
      <Field name="email" component={TextInput} type="text" placeholder="Email Address" />
      <Field name="password" component={TextInput} type="password" placeholder="password" />
      <Button fluid size="large" color="teal">
        Login
      </Button>
    </Segment>
  </Form>
);

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginform' })(LoginForm));
