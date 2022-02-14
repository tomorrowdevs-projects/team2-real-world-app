import { Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';

const SelectAutocomplete = ({ options, setValue }) => {
  return (
    <Row>
      <Col>
        <Form.Group>
          <Form.Label>Choose a product</Form.Label>
          <Select
            options={options}
            onChange={event => setValue(event)}
            isClearable
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default SelectAutocomplete;
