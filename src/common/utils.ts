function padTo2Digits (num: number) {
  return num.toString().padStart(2, '0')
}

/**
 * @description formats date to dd/mm/yyyy format.
 */
export function formatDate (date: Date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear()
  ].join('/')
}

/**
 * @description Returns a new array that concats input array with the old array
 * and checks one attribute in the nested object to see if they are the same.
 */
export function filterObjSet<Item> (inputArr: Item[], oldArr: Item[], attribute: string) {
  return inputArr.reduce((results: Item[], val) => {
    if (!results.find((item) => item[attribute] === val[attribute])) {
      results.push(val)
    }
    return results
  }, [...oldArr])
}
