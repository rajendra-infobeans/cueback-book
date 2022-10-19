export const dateConverter = (str) => {
  var timeInMiliseconds = new Date(str * 1000);
  const dateTime = timeInMiliseconds.toUTCString();
  const dateTimeArray = dateTime?.split(' ');
  const newTimeArray = timeInMiliseconds
    .toTimeString()
    .split(' ')[0]
    .split(':');
  const obj = {
    date: dateTimeArray[1],
    month: dateTimeArray[2],
    year: dateTimeArray[3],
    hours: newTimeArray[0],
    minutes: newTimeArray[1],
  };
  return obj;
};

export const RandomNumberGenerator = () => {
  const min = 100;
  const max = 10000;
  const rand = min + Math.random() * (max - min);
  return rand;
};

export const showNavbar = (location) => {
  if (location?.pathname?.slice(0, 11) === '/app/memory') {
    return false;
  }
  const excludes_routes = [
    '/app/bookcreation',
    '/app/bookeditor',
  ];
  const path = location?.pathname;
  return !excludes_routes.includes(path);
};

export const YourInfoValidate = (values) => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.birthYear) {
    errors.birthYear = 'Birth year is required';
  } else if (
    values.birthYear < 1900 ||
    values.birthYear > new Date().getFullYear()
  ) {
    errors.birthYear = 'Invalid birth year';
  }
  return errors;
};

export const ChangePasswordValidate = (values) => {
  const errors = {};
  if (!values.currentPassword) {
    errors.currentPassword = 'Required';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.newPassword = 'Passwords do not match';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const LoginValidate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export const getDomain = () => {
  const hostnameArray = window.location.hostname.split('.');
  const numberOfSubdomains = hostnameArray.length - 2;
  return hostnameArray.length === 2 ? window.location.hostname : hostnameArray.slice(numberOfSubdomains).join('.');
}
