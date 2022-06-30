import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import {
  inputClasses,
  btnClasses,
  containerClasses,
  headingClasses,
  formSectionClasses,
  labelClasses,
  formGridClasses,
  btnContainerClasses,
} from '../Login/login.styles';

import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../validation/registerSchema';
import useAppContext from '../../context/appContext';

export const Register = () => {
  const { registerUser, isLoading } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <section className={containerClasses}>
      <section className={formSectionClasses}>
        <h2 className={headingClasses}>Create an account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={formGridClasses}>
            {/* Name */}
            <div>
              <label className={labelClasses} htmlFor="email">
                Name
              </label>
              <input
                id="name"
                type="text"
                className={inputClasses}
                {...register('name', { required: true })}
              />
              {errors?.email && <p className="text-sm text-error mt-1">{errors.name?.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className={labelClasses} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={inputClasses}
                {...register('email', { required: true })}
              />
              {errors?.email && <p className="text-sm text-error mt-1">{errors.email?.message}</p>}
            </div>
            {/* password */}
            <div>
              <label className={labelClasses} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className={inputClasses}
                {...register('password', { required: true })}
              />
              {errors?.password && (
                <p className="text-sm text-error mt-1">{errors.password?.message}</p>
              )}
            </div>
          </div>
          <div className={btnContainerClasses}>
            <p>
              Already have account?{' '}
              <Link to="/" className="link">
                Login
              </Link>{' '}
            </p>
            <button type="submit" className={btnClasses}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};
