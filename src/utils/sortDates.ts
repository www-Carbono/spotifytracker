export const sortDate = (data: any): Array<[string, number]> => {
  return data.sort((a: any, b: any) => {
    const [dayA, monthA] = a[0].split('/').map(Number)
    const [dayB, monthB] = b[0].split('/').map(Number)

    if (monthA !== monthB) {
      return monthA - monthB
    }
    return dayA - dayB
  })
}

// const data = sortDate({
//   '1/6': 45262,
//   '2/6': 45290,
//   '22/5': 44954,
//   '23/5': 44988,
//   '24/5': 45020,
//   '25/5': 45060,
//   '26/5': 45110,
//   '27/5': 45162,
//   '28/5': 45179,
//   '29/5': 45202,
//   '30/5': 45231,
//   '31/5': 45247
// })

// console.log(data)
