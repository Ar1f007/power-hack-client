import { useEffect } from 'react';
import useAppContext from '../context/appContext';

export const PaginationBtn = () => {
  const { numOfPages, page, dispatch, getBills } = useAppContext();

  const changePage = (page) => {
    dispatch({ type: 'CHANGE_PAGE', payload: page });
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  useEffect(() => {
    getBills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dispatch]);

  return (
    <>
      <div className="btn-group justify-end my-5">
        <button onClick={prevPage} className="btn">
          Prev
        </button>

        {[...Array(numOfPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => changePage(num + 1)}
            className={`bg-slate-300 p-1 px-3 ${num + 1 === page && 'bg-gray-900 text-white'}`}
          >
            {num + 1}
          </button>
        ))}
        <button onClick={nextPage} className="btn">
          Next
        </button>
      </div>
    </>
  );
};
