import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="nav-div">
      <div className="nav-header">
        <NavLink to="/about" className="nav-link">
          Kahmeeah Obey
        </NavLink>
        {' '}is a{' '}
        
        <NavLink to="/design" className="nav-link">
          designer
        </NavLink>
        {' '}and{' '}
        
        <NavLink to="/code" className="nav-link">
          developer
        </NavLink>
        {' '}based in New York, NY.
      </div>
    </div>
  );
};

export default Header;
