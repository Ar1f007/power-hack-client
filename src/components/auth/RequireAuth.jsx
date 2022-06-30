import { Navigate } from 'react-router-dom';
import useAppContext from '../../context/appContext';

export const RequireAuth = ({ children }) => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
