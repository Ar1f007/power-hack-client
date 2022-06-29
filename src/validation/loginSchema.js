import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Not a valid email address'),
  password: yup.string().required('Password is required'),
});

export default schema;
