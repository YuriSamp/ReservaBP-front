export const formatToDate = (currentDate: Date, time?: string) => {
  if (!time) return

  const formatedDate = new Date(`${currentDate.toISOString().split('T')[0]}T${time}:00`)

  return formatedDate
}
