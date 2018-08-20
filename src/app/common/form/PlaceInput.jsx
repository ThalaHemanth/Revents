import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';

const styles = {
  autocompleteContainer: {
    zIndex: 1000,
  },
};

class PlaceInput extends Component {
  state = {
    scriptLoaded: false,
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  render() {
    const {
      input,
      width,
      options,
      placeholder,
      onSelect,
      meta: { error, touched },
    } = this.props;
    return (
      <Form.Field width={width} error={touched && !!error}>
        <Script
          onLoad={this.handleScriptLoaded}
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAne3eBw8QF26FwO_YUL9YyrAVbbA_MN-8&libraries=places"
        />
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            inputProps={{ ...input, placeholder }}
            options={options}
            onSelect={onSelect}
            styles={styles}
          />
        )}
        {touched &&
          error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
      </Form.Field>
    );
  }
}

export default PlaceInput;
