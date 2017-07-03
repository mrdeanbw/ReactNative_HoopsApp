import moment from 'moment'

let now = new Date()
let dateChecker = []

export default (transaction, i) => {
  let displayData = []
  let displayDate, display, displayStyle
  let today = moment(now).format("MMMM DD, YYYY").toUpperCase()
  let transDate = moment.unix(transaction.created).format("MMMM DD, YYYY").toUpperCase()

  dateChecker.push(transDate)
  if (transDate !== dateChecker[ i - 1 ]){
  if ((transDate === today)) {
    displayDate = 'TODAY'
    display = true
    displayStyle = null
  } else if (transDate !== today) {
      displayDate = transDate
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

