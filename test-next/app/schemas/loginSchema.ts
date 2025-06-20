import * as yup from 'yup';

export const loginValidationSchemas = yup.object().shape({
  username: yup.string().min(8, 'Username must be at least 8 characters long').required('Username is a mandatory field'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is a mandatory field')
})