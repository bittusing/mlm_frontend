import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
