import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, role = 'admin' }) => {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
