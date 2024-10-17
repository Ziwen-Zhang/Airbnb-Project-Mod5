import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };


  const disableSignUpButton = !email || username.length<4 || !firstName || !lastName || password.length<6 || !confirmPassword
  return (
    <>
      <h1 className='SignUpText'>Sign Up</h1>
      <form className='signUpForm'onSubmit={handleSubmit} data-testid='sign-up-form'>
      <label className='formTitle'>
          First Name
          <input className='textBox' data-testid='first-name-input'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='errorMessage' data-testid='first-name-error-message'>{errors.firstName}</p>}
        <label  className='formTitle'>
          Last Name
          <input className='textBox' data-testid='last-name-input'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='errorMessage' data-testid='last-name-error-message'>{errors.lastName}</p>}
        <label className='formTitle'>
          Email
          <input className='textBox' data-testid='email-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='errorMessage' data-testid='email-error-message'>{errors.email}</p>}
        <label className='formTitle'>
          Username
          <input className='textBox' data-testid='username-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='errorMessage' data-testid='username-error-message'>{errors.username}</p>}
        <label  className='formTitle'>
          Password
          <input className='textBox' data-testid='password-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='errorMessage' data-testid='password-error-message'>{errors.password}</p>}
        <label  className='formTitle'>
          Confirm Password
          <input className='textBox' data-testid='confirm-password-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (<p className='errorMessage' data-testid='confirm-password-error-message'>{errors.confirmPassword}</p>)}
        <button className='submitButton'type="submit" disabled={disableSignUpButton} data-testid='form-sign-up-button'>Sign Up</button >
      </form>
    </>
  );
}

export default SignupFormModal;