import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions';

import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import PhotosPage from './PhotosPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';

const actions = {
  updatePassword,
  updateProfile,
};

const SettingsDashboard = props => (
  <Grid>
    <Grid.Column width={12}>
      <Switch>
        <Redirect exact from="/settings" to="/settings/basic" />
        <Route
          path="/settings/basic"
          render={() => (
            <BasicPage updateProfile={props.updateProfile} initialValues={props.user} />
          )}
        />
        <Route path="/settings/photos" component={PhotosPage} />
        <Route
          path="/settings/about"
          render={() => (
            <AboutPage updateProfile={props.updateProfile} initialValues={props.user} />
          )}
        />
        <Route
          path="/settings/account"
          render={() => (
            <AccountPage updatePassword={props.updatePassword} providerId={props.providerId} />
          )}
        />
      </Switch>
    </Grid.Column>
    <Grid.Column width={4}>
      <SettingsNav />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
});

export default connect(
  mapStateToProps,
  actions
)(SettingsDashboard);
