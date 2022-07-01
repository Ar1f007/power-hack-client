import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAppContext from '../../context/appContext';
import { Modal } from './Modal';

export const Header = () => {
  const { register, handleSubmit, watch } = useForm({
    mode: 'onChange',
  });
  const { getBills } = useAppContext();

  const onSubmit = (data) => {
    getBills(data.searchTerm);
  };

  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit, watch]);

  return (
    <>
      <section className="w-full max-w-7xl mx-auto my-5 bg-slate-400 p-2 rounded">
        <header className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
          <p className="font-semibold text-xl text-gray-700">Billing</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="search by name/email/phone number"
              className="input input-sm input-bordered w-full max-w-md"
              {...register('searchTerm')}
            />
          </form>

          <label
            role="button"
            htmlFor="modal"
            className="btn btn-sm max-w-fit lg:justify-self-end modal-button"
          >
            Add new Bill
          </label>
        </header>
      </section>

      <Modal />
    </>
  );
};
