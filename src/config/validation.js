const validation = {
  required: value => value ? undefined : 'Required',
  email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined,
  maxChars15: (value) => !(value.length >= 15) ? undefined : 'Must be 15 characters or less',
  minChars6: (value, number) => !(value.length <= number) ? undefined : 'Password  must be at least 6 characters.',
  noFutureDates: (date, today = new Date()) => (date >= today) ? 'Invalid date of birth' : false,
}

export default validation
