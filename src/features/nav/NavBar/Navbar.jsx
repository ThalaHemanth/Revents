import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { openModal } from '../../modals/modalActions';
import { signoutUser } from '../../auth/authActions';

import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';

const actions = {
  openModal,
  signoutUser,
};

class NavBar extends Component {
  handleSignOut = () => {
    const { history } = this.props;
    this.props.signoutUser();
    history.push('/');
  };

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  render() {
    const { auth } = this.props;
    const { authenticated } = auth;
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item as={Link} to="/" header>
              <img src="/assets/logo.png" alt="logo" />
              Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events" name="Events" />
            {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
            {authenticated && (
              <Menu.Item>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                />
              </Menu.Item>
            )}
            {authenticated ? (
              <SignedInMenu currentUser={auth.currentUser} signOut={this.handleSignOut} />
            ) : (
              <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(NavBar)
);
