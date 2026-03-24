import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex text-white flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-5xl font-bold mb-6 text-gradient">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn-gradient bg-[var(--color-primary-red)] p-3 rounded-lg">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;