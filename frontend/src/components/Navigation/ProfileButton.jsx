import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { clearUserReviews } from '../../store/review';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const redirectingNew = () => {
    navigate(`/spots/new`)
  };
  const redirectingManage = ()=>{
    navigate('/spots/current')
  }
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
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
    dispatch(clearUserReviews());
    navigate('/')
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  
  return (
    <div className='upperRightMenu'>
      {user && (<p className='createNewSpotText' onClick={redirectingNew}>Create a new spot</p>)}
      <button onClick={toggleMenu} className="profile-button" data-testid='user-menu-button'>
      <FontAwesomeIcon icon={faBars}/>
        <FaUserCircle />
      </button>
      <div className={ulClassName} ref={ulRef} data-testid='user-dropdown-menu'>
        {user ? (
          <>
            <div>{user.username}</div>
            <div data-testid='Hello, Demo'>Hello, {user.firstName}</div>
            <div data-testid='demo@user.io'>{user.email}</div>
            <button onClick={redirectingManage}>Manage Spot</button>
            <div>
              <button onClick={logout} data-testid='Log out'>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Sign Up"
              data-testid='Sign Up'
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="Log In"
              data-testid='Log in'
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;