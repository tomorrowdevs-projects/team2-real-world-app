import { Table } from 'react-bootstrap';
import DateLabel from '../DateLabel/DateLabel';

const SearchResult = ({
  select,
  isInvalidProductName,
  isInvalidDateRangeProp,
  responseLabel,
  startDate,
  endDate,
  productName,
  totalOrders,
  revenue,
  numberOfClients,
  ordersAvg,
}) => {
  console.log(isInvalidProductName);
  if (isInvalidProductName) {
    return <h4>There is no data available for the selected product.</h4>;
  } else if (isInvalidDateRangeProp) {
    return <h4>Invalid date range. Data not available.</h4>;
  } else
    return (
      <div className='container-result mt-4'>
        <DateLabel dateFrom={startDate} dateTo={endDate} />
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
                  <td>{productName}</td>
                  <td>{totalOrders}</td>
                  <td>€ {revenue}</td>
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
                  <h5 className='text-center'>
                    {responseLabel === 'Customers' && numberOfClients}
                    {responseLabel === 'Average' && `€ ${ordersAvg}`}
                  </h5>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
    );
};

export default SearchResult;
