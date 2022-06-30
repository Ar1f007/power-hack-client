import { Modal } from './Modal';

export const Header = () => {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto my-5 bg-slate-400 p-2 rounded">
        <header className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
          <p className="font-semibold text-xl text-gray-700">Billing</p>
          <form>
            <input
              type="text"
              placeholder="search"
              className="input input-sm input-bordered w-full max-w-md"
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
