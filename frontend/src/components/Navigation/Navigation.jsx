import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAirbnb} from '@fortawesome/free-brands-svg-icons'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate()

  return (
    <nav className='navigation'>
      <div className="logo" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faAirbnb} size="2x" color="red" />
        <span className="logo-text">airbnb</span>
      </div>
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;