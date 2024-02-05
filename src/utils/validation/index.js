import passwordValidator from 'password-validator';
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';

export const loginValidations = Yup.object().shape({
  email: Yup.string()

    .required("Email field can't be empty.")
    .email('Invalid email address.')
    .matches(
      RegExp('^\\w[\\w\\.-]*@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{3,}$'),
      'Invalid email address.',
    ),
  password: Yup.string()
    .required("Password field can't be empty.")
    .min(8, 'Invalid Password.')
    .matches(RegExp('(.*[a-z].*)'), 'Invalid Password.')
    .matches(RegExp('(.*[A-Z].*)'), 'Invalid Password.')
    .matches(RegExp('(.*\\d.*)'), 'Invalid Password.')
    .matches(
      RegExp('(^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$)'),
      'Invalid Password.',
    ),
});
export const logoutValidations = Yup.object().shape({
  password: Yup.string()
    .required("Password field can't be empty.")
    .min(8, 'Invalid Password.')
    .matches(RegExp('(.*[a-z].*)'), 'Invalid Password.')
    .matches(RegExp('(.*[A-Z].*)'), 'Invalid Password.')
    .matches(RegExp('(.*\\d.*)'), 'Invalid Password.')
    .matches(
      RegExp('(^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$)'),
      'Invalid Password.',
    ),
});

export const signupValidations = Yup.object().shape({
  bussinessProfileImage: Yup.string().required('Image is Required'),
  fullName: Yup.string().required("Full name field can't be empty."),
  email: Yup.string()
    .required("Email field can't be empty.")
    .email('You have entered invalid email address')
    .matches(
      RegExp('^\\w[\\w\\.-]*@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{3,}$'),
      'You have entered invalid email address.',
    ),
  bussinessName: Yup.string().required("Business name field can't be empty."),
  phoneNumber: Yup.string()
    .required("Phone number field can't be empty.")
    .min(11, 'You have entered invalid phone number'),
  einNo: Yup.string()
    .min(7, 'You have entered invalid ein number.')
    .required("EIN no field can't be empty."),
  password: Yup.string()
    .required("Password field can't be empty.")
    .min(
      8,
      'Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    )
    .matches(
      RegExp('(.*[a-z].*)'),
      'Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    )
    .matches(
      RegExp('(.*[A-Z].*)'),
      'Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    )
    .matches(
      RegExp('(.*\\d.*)'),
      'Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    )
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    ),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Password and Confirm Password must be same.',
    )
    .required("Confirm password field can't be empty."),
});
export const completeValidations = Yup.object().shape({
  bussinessProfileImage: Yup.string().required('Image is Required'),
  fullName: Yup.string().required("Full name field can't be empty."),
  bussinessName: Yup.string().required("bussiness name field can't be empty."),
  phoneNumber: Yup.string().required("Phone number field can't be empty"),
  einNo: Yup.string()
    .max(9, 'EIN no should be 9 characters minimum.')
    .required("EIN no field can't be empty."),
});
export const forgetValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email field can't be empty.")
    .email('Invalid email address')
    .matches(
      RegExp('^\\w[\\w\\.-]*@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{3,}$'),
      'You have entered invalid email address.',
    ),
});

export const resetValidations = Yup.object().shape({
  password: Yup.string()
    .required("New Password field can't be empty.")
    .min(
      8,
      'New Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    )
    .matches(
      RegExp('(.*[a-z].*)'),
      'New Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    )
    .matches(
      RegExp('(.*[A-Z].*)'),
      'New Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    )
    .matches(
      RegExp('(.*\\d.*)'),
      'New Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    )
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'New Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
    ),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Password and Confirm Password must be same.',
    )
    .required("Confirm password field can't be empty."),
});

export const editProfileValidations = Yup.object().shape({
  fullName: Yup.string().required('Please enter full name'),
  email: Yup.string()
    .required('Please enter email address')
    .email('Please enter valid email address'),
  businessName: Yup.string().required('Please enter business name'),
  einNo: Yup.string().required('Please enter your Ein no.'),
});

export const addNewEventValidation = Yup.object().shape({
  title: Yup.string().required('Please enter title'),
  subTitle: Yup.string().required('Please enter subTitle/togline'),
  selectProperty: Yup.string().required('Please select property'),
  time: Yup.string().required('Please enter time'),
  selectCategory: Yup.string().required('Please select category'),
  selectEventCategories: Yup.string().required(
    'Please select event categories',
  ),
  description: Yup.string().required('Please enter description'),
});

export const addNewPropertyValidation = Yup.object().shape({
  name: Yup.string().required('Please enter name'),
  capacity: Yup.string().required('Please enter capacity'),
  description: Yup.string().required('Please enter description'),
});

export const changePasswordValidations = Yup.object().shape({
  currentPassword: Yup.string().required('Please enter current password.'),
  newPassword: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 characters minimum.')
    .matches(
      RegExp('(.*[a-z].*)'),
      'Password should have a minimum of 1 lowercase letter',
    )
    .matches(
      RegExp('(.*[A-Z].*)'),
      'Password should have a minimum of 1 uppercase letter',
    )
    .matches(RegExp('(.*\\d.*)'), 'Password should have a minimum of 1 digit')
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'Password should have a minimum of 1 symbol.',
    ),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Password and Confirm Password must be same.',
    )
    .required('Confirm Password is required'),
});

export const schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .has()
  .symbols();
