import axios from "axios"

export const fetchByCategory = async (category: string) => {
  try {
    let path = ''
    const { hostname } = window.location
    if (hostname === 'localhost') path = 'http://localhost:5000'
    const response = await axios.get(`${path}/api/${category}`)
    return await response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Something went wrong! => ', error.message)
    }
  }
}
