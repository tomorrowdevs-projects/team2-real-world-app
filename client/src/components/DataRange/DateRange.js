import { Row, Col, Form } from 'react-bootstrap';
import './date-range.scss';

const DateRange = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  handleClickReset,
}) => {
  return (
    <Row className='search-date-box'>
      <Col onClick={handleClickReset}>
        <Form.Group>
          <Form.Label>From</Form.Label>
          <Form.Control
            type='date'
            value={dateFrom}
            onChange={event => setDateFrom(event.target.value)}
          />
        </Form.Group>
      </Col>
      <Col>
        <Col>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <Form.Control
              type='date'
              value={dateTo}
              onChange={event => setDateTo(event.target.value)}
            />
          </Form.Group>
        </Col>
      </Col>
    </Row>
  );
};

export default DateRange;
