import './date-label.scss';

const DateLabel = ({ dateFrom, dateTo }) => {
  if (!dateFrom || !dateTo) {
    return <></>;
  }
  const convertDate = date =>
    `${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`;
  return (
    <p className='date-range-label'>
      From <span>{convertDate(dateFrom)}</span> to{' '}
      <span>{convertDate(dateTo)}</span>
    </p>
  );
};

export default DateLabel;
