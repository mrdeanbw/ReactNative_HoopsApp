const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let now = new Date()
let dateChecker = []

export default (user, i) => {
  let displayData = []
  let displayDate, display, displayStyle
  let today = months[now.getMonth()].toUpperCase() + ' ' + (now.getDay()) + ', ' + now.getFullYear()

  dateChecker.push(user.date)
  if (user.date !== dateChecker[ i - 1 ]){
  if ((user.date === today)) {
    displayDate = 'TODAY'
    display = true
    displayStyle = null
  } else if (user.date !== today) {
      displayDate = user.date
      display = true
      displayStyle = null
    }
  }else {
    displayDate = null
    display = false
    displayStyle = {paddingTop: 3}
  }
displayData = {displayDate, display, displayStyle }

return displayData
}

