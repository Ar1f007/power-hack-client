import * as yup from 'yup';
const phoneRegExp = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

const addBillSchema = yup.object({
  email: yup.string().required('Email is required').email('Not a valid email address'),
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  amount: yup
    .number()
    .positive('Must be greater than zero')
    .required('Add Amount')
    .typeError('Add an amount'),
});

export default addBillSchema;
