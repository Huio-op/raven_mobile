export default {
  formik: {
    mixed: {
      default: 'Is invalid',
      required: 'Required field',
      oneOf: 'Must be one of the following values: ${values}',
      notOneOf: 'Must not be one of the following values: ${values}',
    },
    string: {
      length: 'Must be exactly ${length} characters',
      min: 'Must be at least ${min} characters',
      max: 'Must be at most ${max} characters',
      email: 'Must be a valid email',
      url: 'Must be a valid URL',
      trim: 'Must be a trimmed string',
      lowercase: 'Must be a lowercase string',
      uppercase: 'Must be a upper case string',
    },
    number: {
      min: 'Must be greater than or equal to ${min}',
      max: 'Must be less than or equal to ${max}',
      lessThan: 'Must be less than ${less}',
      moreThan: 'Must be greater than ${more}',
      notEqual: 'Must be not equal to ${notEqual}',
      positive: 'Must be a positive number',
      negative: 'Must be a negative number',
      integer: 'Must be an integer',
    },
    date: {
      min: 'Field must be later than ${min}',
      max: 'Field must be at earlier than ${max}',
    },
    array: {
      min: 'Field must have at least ${min} items',
      max: 'Field must have less than or equal to ${max} items',
    },
  },
  welcome: {
    welcomeToRaven: 'Index to',
    raven: 'Raven',
    create: 'Create account',
    login: 'Sign in',
  },
  feed: {
    home: 'Home screen',
  },
};
