export const getAllItems = async () => {
  const response = await fetch('/data/items.json')
  const decodedResponse = response.json()
  return decodedResponse
}
