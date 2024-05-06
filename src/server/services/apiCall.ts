export const apiCall = async (): Promise<any> => {
  const data = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'update=false'
  })
  const json = await data.json()
  return json
}
