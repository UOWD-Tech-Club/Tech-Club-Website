// components/AdminInviteModal.jsx
import { useState } from 'react';
import axios from 'axios';
import styles from './AdminInviteModal.module.css';

export default function AdminInviteModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await axios.post(
        'http://localhost:5000/auth/invite-admin',
        { email },
        { withCredentials: true },
      );
      setStatus('Magic link sent! Please check the email.');
    } catch (err) {
      setStatus('Failed to send magic link:', err);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          X
        </button>
        <h2>Invite Admin</h2>
        <form className={styles.inviteForm} onSubmit={handleInvite}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Magic Link</button>
        </form>
        {status && <p className={styles.statusMsg}>{status}</p>}
      </div>
    </div>
  );
}
