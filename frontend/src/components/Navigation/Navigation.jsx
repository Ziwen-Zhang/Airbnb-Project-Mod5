import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import { clearSpotReviews } from '../../store/review';
import airdnd from '../../../public/favicon.ico'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <nav className='navigation'>
      <div className="logo" onClick={() => {
        dispatch(clearSpotReviews())
        navigate('/')
        }}>
        <img src={airdnd} alt="logo" className='logo'/>
        <span className="logo-text">airdnd</span>
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