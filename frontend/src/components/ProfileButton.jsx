import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import * as sessionActions from '../store/session';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu((prev) => !prev);
  };


  
  const navigateToYourBlogs = () => {
    navigate('/blogs/current');
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')

  };


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  /** showMenu ?  */

  return (
    <>
      <button onClick={(e) => toggleMenu(e)}>
        <FaUserCircle />
      </button>
     {showMenu ? (
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <ul className = "toggleMenuList">
            <li>Hello, {user.username}!</li>
            <li>{user.email}</li>
            <li><button onClick = {navigateToYourBlogs}>Manage Your Blogs</button></li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
          </>
        ) : (
          <div className = "modals">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={() => closeMenu()}
              modalComponent={<LoginFormModal />}
            />
            <button>
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={() => closeMenu()}
              modalComponent={<SignupFormModal />}
            />
             </button>
          </div>
        )}
      </ul> 
      ) : (<></>)
      }
    </>
  );
}

export default ProfileButton;