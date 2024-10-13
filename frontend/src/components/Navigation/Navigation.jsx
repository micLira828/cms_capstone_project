// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaHotel } from "react-icons/fa6";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  ulStyle = {
    listStyletype: 'none'
  }

  return (
    <ul style = {ulStyle}>
      <li className = 'homeIcon'>
        <NavLink to="/">
          <FaHotel className = "airbnbLogo"/>
        </NavLink>
      </li>
      {isLoaded && (
        <li className = 'profileButton'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;