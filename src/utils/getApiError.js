export default (response) => {
  const status = response.status
  const message = response.data.message

  let error = 'Please try again later'
  if (status >= 200 && status < 500 && message) {
    error = response.data.message
  }

  return error
}
