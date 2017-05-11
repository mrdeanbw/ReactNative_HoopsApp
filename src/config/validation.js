
// Validation library

  Require = ( value ) => !value ? false : true
  StringIsLonger = ( value , number) => !(value.lenght > number) ? true : false
  StringIsLongerOrEqual = ( value , number) => !(value.lenght >= number) ? true : false
  StringIsShorter = ( value , number) => !(value.lenght < number) ? true : false
  StringIsShorterOrEqual = ( value , number) => !(value.lenght <= number) ? true : false
  EmailIsValid = ( email ) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) ? false : true
  UkMobileIsValid = ( phone ) =>  (!/^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/i.test(phone)) ? false : true
  NumberIsSmaller = ( value, number ) => !(value < number) ? true : false
  NumberIsBigger = ( value, number ) => !(value > number) ? true : false
  NumberIsBiggerOrEqual = ( value, number ) => !(value >= number) ? true : false
  NumberIsSmallerOrEqual = ( value, number ) =>!(value >= number) ? true : false


export*

