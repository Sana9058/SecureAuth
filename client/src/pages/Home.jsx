import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Production-Ready Authentication
          </div>

          <h1 className="hero-title">
            Secure Authentication
            <span className="gradient-text"> Made Simple</span>
          </h1>

          <p className="hero-description">
            SecureAuth is a full-stack MERN authentication system featuring JWT
            access & refresh tokens, automatic token renewal, and enterprise-grade
            security — built by Sana Aijaz for a Full Stack Developer Internship
            technical assessment.
          </p>

          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-visual animate-slide-up">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>Two-Token Auth</h3>
            <p>15-min access tokens with 7-day refresh tokens stored securely in MongoDB.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>bcrypt Hashing</h3>
            <p>Passwords hashed with bcrypt salt rounds for maximum security.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </div>
            <h3>Auto Refresh</h3>
            <p>Axios interceptors automatically renew expired access tokens seamlessly.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
