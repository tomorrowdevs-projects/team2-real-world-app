import './date-label.scss';

const DateLabel = ({ dateText, dateFrom, dateTo }) => {
  return (
    <>
      <p className='date-range-label mb-0 fs-4'>{dateText}</p>
      <p className='date-range-label'>
        from <span>{dateFrom}</span> to <span>{dateTo}</span>
      </p>
    </>
  );
};

export default DateLabel;
