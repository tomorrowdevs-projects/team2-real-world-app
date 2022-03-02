import './date-label.scss';

const DateLabel = ({ dateText, dateFrom, dateTo }) => {
  if (!dateFrom || !dateTo) {
    return <></>;
  }
  const convertDate = date =>
    `${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`;
  return (
    <>
      <p className='date-range-label mb-0 fs-4'>{dateText}</p>
      <p className='date-range-label'>
        from <span>{convertDate(dateFrom)}</span> to{' '}
        <span>{convertDate(dateTo)}</span>
      </p>
    </>
  );
};

export default DateLabel;
