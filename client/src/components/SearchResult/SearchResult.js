import { Table } from 'react-bootstrap';
import DateLabel from '../DateLabel/DateLabel';

const SearchResult = ({ response, select, responseLabel }) => {
  if (!response[0]) {
    return <></>;
  }

  const { start_date, end_date } = response[0];

  return (
    <div className='container-result mt-4'>
      <DateLabel
        dateText={'The search found results'}
        dateFrom={start_date}
        dateTo={end_date}
      />
      <Table striped bordered hover size='sm'>
        {select ? (
          <>
            <thead>
              <tr>
                {responseLabel.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{response[0].product_name}</td>
                <td>{response[0].total_orders}</td>
                <td>€ {response[0].revenue}</td>
              </tr>
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td>
                <h5>{responseLabel}</h5>
              </td>
              <td>
                <h5>{response[0].num_clients || response[0].orders_avg}</h5>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default SearchResult;
