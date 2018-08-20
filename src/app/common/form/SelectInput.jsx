import React from 'react';
import { Form, Select, Label } from 'semantic-ui-react';

const SelectInput = ({ type, multiple, options, input, placeholder, meta: { touched, error } }) => (
  <Form.Field error={touched && !!error}>
    <Select
      value={input.value || null}
      multiple={multiple}
      options={options}
      placeholder={placeholder}
      onChange={(e, data) => input.onChange(data.value)}
    />
    {touched &&
      error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
  </Form.Field>
);

export default SelectInput;
