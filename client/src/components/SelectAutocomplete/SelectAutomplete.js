import { Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';

const SelectAutocomplete = ({ options, setInput, setSelected }) => {
  return (
    <Row>
      <Col>
        <Form.Group>
          <Form.Label>Choose a product</Form.Label>
          <Select
            options={options}
            onInputChange={event => setInput(event)}
            onChange={event => setSelected(event)}
            isClearable
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default SelectAutocomplete;
