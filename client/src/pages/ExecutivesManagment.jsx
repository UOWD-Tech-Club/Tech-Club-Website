import { useState } from 'react';
import AdminInviteModal from '../components/AdminInviteModal';

const ExecutivesManagment = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <h1>Executives Management</h1>
      <p>
        This is a protected page for managing executives. (Content coming soon!)
      </p>
      <button onClick={() => setModalOpen(true)}>Invite Admin</button>
      <AdminInviteModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ExecutivesManagment;
