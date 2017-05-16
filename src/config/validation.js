// Validation library
export const Required = (value) => !value ? true : false
export const StringIsLonger = (value, number) => !(value.length < number) ? false : true
export const StringIsLongerOrEqual = (value, number) => !(value.length <= number) ? false : true
export const StringIsShorter = (value, number) => !(value.length > number) ? false : true
export const StringIsShorterOrEqual = (value, number) => !(value.length >= number) ? false : true
export const EmailIsValid = (email) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) ? true : false
export const UkMobileIsValid = (phone) =>  (!/^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/i.test(phone)) ? false : true
export const NumberIsSmallerThan = (value, number) => !(value > number) ? true : false
export const NumberIsBiggerThan = (value, number) => !(value < number) ? true : false
export const NumberIsBiggerOrEqualThan = (value, number) => !(value <= number) ? true : false
export const NumberIsSmallerOrEqualThan = (value, number) =>!(value >= number) ? true : false
export const noFutureDates = (date, today = new Date()) => (date >= today) ? true : false



