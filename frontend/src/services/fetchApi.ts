import axios from "axios"

export const fetchByCategory = async (category: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/${category}`)
    return await response.data.articles
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Something went wrong! => ', error.message)
    }
  }
}
