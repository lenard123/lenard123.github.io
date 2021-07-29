const dateDiff = (date1, date2) => {
  const diff = date1 - date2
  return Math.floor(diff / 1000 / 60 / 60 / 24 / 365)
}

const STARTED_PROGRAMMING_AT = 2016
const BIRTH_DATE = new Date("07/20/2001")
const COLLEGE_LEVEL = "3rd year"

const currentDate = new Date()
const CURRENT_YEAR = currentDate.getFullYear()

const AGE = dateDiff(currentDate, BIRTH_DATE)
const EXPERIENCE = CURRENT_YEAR - STARTED_PROGRAMMING_AT

export default function() {
  return {
    AGE,
    COLLEGE_LEVEL,
    CURRENT_YEAR,
    EXPERIENCE
  }
}