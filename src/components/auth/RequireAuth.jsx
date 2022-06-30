import { Navigate, Outlet } from 'react-router-dom';
import useAppContext from '../../context/appContext';

export const RequireAuth = () => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
