import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import { clearSpotReviews } from '../../store/review';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <nav className='navigation'>
      <div className="logo" data-testid='logo'onClick={() => {
        dispatch(clearSpotReviews())
        navigate('/')
        }}>
        <img src="/favicon.ico" alt="logo" className='logo' data-testid='favicon'/>
        <span className="logo-text">Airdnd</span>
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