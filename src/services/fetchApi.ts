export const fetchByCategory = async (category: string) => {
  try {
    const key = import.meta.env.VITE_API_KEY
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&country=br&max=12&apikey=${key}`)
    const data = await response.json()
    return data.articles
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Something went wrong! => ', error.message)
    }
  }
}
