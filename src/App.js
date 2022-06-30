import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './components/auth/RequireAuth';
import { Header } from './components/Header';
import useAppContext from './context/appContext';
import { BillingList } from './pages/Billing/BillingList';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

export const App = () => {
  const { user } = useAppContext();
  return (
    <>
      {user && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/billing" element={<BillingList />} />
        </Route>
      </Routes>
    </>
  );
};
