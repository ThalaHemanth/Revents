import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/Navbar';
import HomePage from '../../features/home/HomePage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailed from '../../features/user/UserDetailed/UserDetailed';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventDetailedPAge from '../../features/event/EventDetailed/EventDetailedPage';
import EventForm from '../../features/event/EventForm/EventForm';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
          <Route exact path="/" component={HomePage} />
          <Route path="/events" component={EventDashboard} />
          <Route path="/events/:id" component={EventDetailedPAge} />
          <Route path="/people" component={PeopleDashboard} />
          <Route path="/profile/:id" component={UserDetailed} />
          <Route path="/settings" component={SettingsDashboard} />
          <Route path="/createEvent" component={EventForm} />
        </Container>
      </div>
    );
  }
}

export default App;
