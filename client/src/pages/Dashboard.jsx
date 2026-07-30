import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch {
      navigate('/login');
    } finally {
      setLoggingOut(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="page dashboard-page">
      <div className="dashboard-container animate-fade-in">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p className="dashboard-subtitle">Welcome to your secure workspace</p>
          </div>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <LoadingSpinner size="small" />
                Logging out...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </>
            )}
          </button>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2>Welcome, {user?.name}!</h2>
              <p>You are successfully authenticated.</p>
            </div>
          </div>

          <div className="dashboard-divider"></div>

          <div className="dashboard-info">
            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Full Name</span>
                <span className="info-value">{user?.name}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Email Address</span>
                <span className="info-value">{user?.email}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Member Since</span>
                <span className="info-value">{formatDate(user?.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-status">
            <div className="status-badge status-active">
              <span className="status-dot"></span>
              Session Active
            </div>
            <p className="status-note">
              Your access token auto-refreshes when expired. No action needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
