import useAppContext from '../context/appContext';

export const Header = () => {
  const { logout, totalAmount } = useAppContext();

  return (
    <header className="bg-slate-400">
      <nav className="h-14 flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="text-xl">power-hack</div>
        <div className="font-semibold text-xl flex gap-2 item-center">
          <p className="text-gray-700">Total Paid: {totalAmount}</p>
          <button className="btn btn-sm ml-2" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};
