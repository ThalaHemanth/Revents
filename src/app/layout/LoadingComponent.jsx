import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const LoadingComponent = ({ inverted }) => (
  <Dimmer inverted={inverted} active>
    <Loader content="...Loading" />
  </Dimmer>
);

export default LoadingComponent;
