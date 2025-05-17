import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
  const [status, setStatus] = useState('Logging you in...');
  const [needsPassword, setNeedsPassword] = useState(false);
  const [setPasswordError, setSetPasswordError] = useState('');
  const [setPasswordStatus, setSetPasswordStatus] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Handle magic link login on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (!token) {
      setStatus('No token found in URL.');
      return;
    }

    axios
      .post(
        'http://localhost:5000/auth/magic-login',
        { token },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.needsPassword) {
          setNeedsPassword(true);
          setStatus(''); // Clear status so we show the form
        } else {
          setStatus('Login successful! Redirecting...');
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        }
      })
      .catch(() => {
        setStatus('Login failed. Invalid or expired link.');
      });
  }, [location, navigate]);

  // Handle set password form submit
  const handleSetPassword = async (e) => {
    e.preventDefault();
    setSetPasswordError('');
    setSetPasswordStatus('');
    if (!newPassword || !confirmPassword) {
      setSetPasswordError('Please fill in both fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setSetPasswordError('Passwords do not match.');
      return;
    }
    try {
      const res = await axios.post(
        'http://localhost:5000/auth/set-password',
        { password: newPassword },
        { withCredentials: true },
      );

      console.log(res.data);

      setSetPasswordStatus(
        'Password set successfully! Redirecting to dashboard...',
      );
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setSetPasswordError('Failed to set password:', err);
    }
  };

  return (
    <div className={styles.adminLoginContainer}>
      <h2>Admin Magic Link Login</h2>
      {status && <p>{status}</p>}
      {needsPassword && (
        <form className={styles.loginForm} onSubmit={handleSetPassword}>
          <h3>Set Your Password</h3>
          {setPasswordStatus && (
            <div className={styles.success}>{setPasswordStatus}</div>
          )}
          {setPasswordError && (
            <div className={styles.errorMsg}>{setPasswordError}</div>
          )}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Set Password</button>
        </form>
      )}
    </div>
  );
};

export default AdminLoginPage;
