import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page not-found-page">
      <div className="not-found-content animate-fade-in">
        <h1 className="not-found-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
