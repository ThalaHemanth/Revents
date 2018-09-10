import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { loginUser, socialLogin } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  loginUser,
  socialLogin,
};

const LoginForm = props => (
  <Form error size="large" onSubmit={props.handleSubmit(props.loginUser)}>
    <Segment>
      <Field name="email" component={TextInput} type="text" placeholder="Email Address" />
      <Field name="password" component={TextInput} type="password" placeholder="password" />
      {props.error && (
        <Label basic color="red">
          {props.error}
        </Label>
      )}
      <Button fluid size="large" color="teal">
        Login
      </Button>
      <Divider horizontal>OR</Divider>
      <SocialLogin socialLogin={props.socialLogin} />
    </Segment>
  </Form>
);

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
