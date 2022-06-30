import { useForm } from 'react-hook-form';
import addBillSchema from '../../validation/addBillSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import useAppContext from '../../context/appContext';

export const Modal = () => {
  const { saveBill, formData, isEditing, updateBill } = useAppContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(addBillSchema),
  });

  const onSubmit = (data) => {
    if (isEditing) {
      updateBill({ ...data, id: formData._id });
    } else {
      saveBill(data);
    }
  };

  const clearForm = () => {
    reset();
  };

  useEffect(() => {
    const modal = document.querySelector('#modal');
    modal.checked = false;
    reset();
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (isEditing) {
      setValue('name', formData.name);
      setValue('email', formData.email);
      setValue('phone', formData.phone);
      setValue('amount', formData.amount);
    }
  }, [isEditing, setValue, formData]);
  return (
    <>
      <input type="checkbox" id="modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={clearForm}
          >
            ✕
          </label>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="form-control max-w-sm mb-3">
              <label className="input-group input-group-vertical">
                <span>Email</span>
                <input
                  {...register('email')}
                  type="text"
                  placeholder="info@gmail.com"
                  className="input input-bordered"
                />
              </label>

              {errors?.email && <p className="text-sm text-error mt-1">{errors.email?.message}</p>}
            </div>
            {/* Email */}

            {/* Name */}
            <div className="form-control max-w-sm mb-3">
              <label className="input-group input-group-vertical">
                <span>Full Name</span>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="John doe"
                  className="input input-bordered"
                />
              </label>

              {errors?.name && <p className="text-sm text-error mt-1">{errors.name?.message}</p>}
            </div>
            {/* Name */}

            {/* Phone */}
            <div className="form-control max-w-sm mb-3">
              <label className="input-group input-group-vertical">
                <span>Phone</span>
                <input
                  {...register('phone')}
                  type="text"
                  placeholder="+880 1xxxxxxxx"
                  className="input input-bordered"
                />
              </label>
              {errors?.phone && <p className="text-sm text-error mt-1">{errors.phone?.message}</p>}
            </div>
            {/* Phone */}

            {/* Paid amount */}
            <div className="form-control max-w-sm mb-3">
              <label className="input-group input-group-vertical">
                <span>Paid Amount</span>
                <input
                  {...register('amount')}
                  type="text"
                  placeholder="1000"
                  className="input input-bordered"
                />
              </label>

              {errors?.amount && (
                <p className="text-sm text-error mt-1">{errors.amount?.message}</p>
              )}
            </div>
            {/* Paid amount */}

            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
