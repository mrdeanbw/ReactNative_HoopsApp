export const required =  value => value ? undefined : 'Required'
export const email =  value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
export const maxChars15 = (value) => !(value.length >= 15) ? undefined : 'Must be 15 characters or less'
export const minChars6 = (value) => !(value.length <= 6) ? undefined : 'Password  must be at least 6 characters.'
export const noFutureDates = (date, today = new Date()) => (date >= today) ? 'Invalid date of birth' : false



