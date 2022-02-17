import './logo.scss';

const Logo = ({ navigate, to }) => {
  return (
    <div id='logo' onClick={() => navigate(to)}>
      <span>X-Comm App</span>
    </div>
  );
};

export default Logo;
