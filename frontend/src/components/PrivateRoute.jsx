import { Navigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

const PrivateRoute = ({ children }) => {
  const { userID } = useSession();

  if (!userID) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;