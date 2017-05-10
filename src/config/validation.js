 // passing values into validation function
export const validate = values => {
  const errors = {}
  // Name validation
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less'
  }
  //Email validation
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  //Password validation
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Password  must be at least 6 charakters.'
  }
/*
  //phone validation
  if (!values.phone) {
    errors.phone = 'Required'
  }
*/
  //address validation
  if (!values.address) {
    errors.address = 'Required'
  }
  //dob validation
  let  today = new Date()

  if (!values.dob) {
    errors.dob = 'Required'
  } else if (values.dob >= today) {
      errors.dob = 'Invalid date of birth'
  }

  //address validation
  if (!values.gender) {
    errors.gender = 'Required'
  }

  return errors
}

 // passing values into warning function
export const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}


