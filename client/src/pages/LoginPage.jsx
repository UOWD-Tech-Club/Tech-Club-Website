import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [revealPassword, setRevealPassword] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [emailError, setEmailError] = useState('');
  const { login } = useAuth();

  const handlePasswordToggle = () => {
    setRevealPassword((prev) => !prev);
  };

  const handleButtonHover = () => {
    setIsButtonHovered(true);
    if (emailInputRef.current) emailInputRef.current.blur();
    if (passwordInputRef.current) passwordInputRef.current.blur();
  };

  const handleButtonLeave = () => {
    setIsButtonHovered(false);
  };

  const validateEmail = () => {
    if (
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email,
      )
    ) {
      setEmailError('Proper email format required');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logo_tech}>
            <h1>Tech</h1>
          </div>
          <div className={styles.logo_club}>
            <h1>Club</h1>
          </div>
        </div>
        <div>
          <form action="" onSubmit={handleSubmit}>
            <h3 className={styles.loginHeading}>Login</h3>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formInputSection}>
              <div className={styles.usernameSection}>
                <p>Email</p>
                <input
                  type="text"
                  placeholder="username@gmail.com"
                  ref={emailInputRef}
                  onChange={(e) => setEmail(e.target.value)}
                  className={isButtonHovered ? styles.noFocus : ''}
                />
                {emailError && (
                  <span className={styles.error}>{emailError}</span>
                )}
              </div>
              <div className={styles.passwordSection}>
                <p>Password</p>
                <input
                  type={revealPassword ? 'text' : 'password'}
                  placeholder="Password"
                  ref={passwordInputRef}
                  onChange={(e) => setPassword(e.target.value)}
                  className={isButtonHovered ? styles.noFocus : ''}
                />
                {revealPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className={styles.eyeIcon}
                    onClick={handlePasswordToggle}
                  >
                    <g
                      fill="none"
                      stroke="#fafafa"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                      <path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" />
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className={styles.eyeIcon}
                    onClick={handlePasswordToggle}
                  >
                    <g
                      fill="none"
                      stroke="#fafafa"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M10.73 5.073A11 11 0 0 1 12 5c4.664 0 8.4 2.903 10 7a11.6 11.6 0 0 1-1.555 2.788M6.52 6.519C4.48 7.764 2.9 9.693 2 12c1.6 4.097 5.336 7 10 7a10.44 10.44 0 0 0 5.48-1.52m-7.6-7.6a3 3 0 1 0 4.243 4.243"
                      />
                      <path d="m4 4l16 16" />
                    </g>
                  </svg>
                )}
              </div>
            </div>
            <button
              className={styles.loginButton}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
