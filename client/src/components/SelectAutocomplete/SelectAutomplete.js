import { Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';

const SelectAutocomplete = ({
  options,
  setInput,
  setSelected,
  isDisabled,
  isLoading,
  handleClickAutocomplete,
}) => {
  return (
    <Row>
      <Col onClick={handleClickAutocomplete}>
        <Form.Group>
          <Form.Label>Choose a product</Form.Label>
          <Select
            options={options}
            onInputChange={event => setInput(event)}
            onChange={event => setSelected(event)}
            isClearable
            isDisabled={isDisabled}
            isLoading={isLoading}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default SelectAutocomplete;
