import { useForm } from 'react-hook-form';
import {
  inputClasses,
  btnClasses,
  containerClasses,
  headingClasses,
  formSectionClasses,
  labelClasses,
  formGridClasses,
  btnContainerClasses,
} from './login.styles';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../validation/loginSchema';
import useAppContext from '../../context/appContext';
import { useEffect } from 'react';

export const Login = () => {
  const { user, loginUser, isLoading } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    loginUser(data);
  };

  useEffect(() => {
    if (user) {
      navigate('/billing');
    }
  }, [user, navigate]);

  return (
    <section className={containerClasses}>
      <section className={formSectionClasses}>
        <h2 className={headingClasses}>Login to your account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={formGridClasses}>
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
              Don't have account?{' '}
              <Link to="/register" className="link">
                Create here
              </Link>{' '}
            </p>
            <button type="submit" className={btnClasses}>
              {isLoading ? 'Login...' : 'Login'}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};
