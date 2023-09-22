/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export interface Article {
  title: string,
  description: string,
  url: string,
  image: string,
  source: {
    name: string
  },
}

export interface ArticleAndType {
  articles: Article[],
  type: string
}

type ContextType = {
  articles: ArticleAndType,
  setArticles: React.Dispatch<React.SetStateAction<ArticleAndType>>
}

const MyContext = createContext<ContextType | undefined>(undefined)

function ContextProvider ({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<ArticleAndType>({} as ArticleAndType)

  const context: ContextType = { articles, setArticles }

  return (
    <MyContext.Provider value={context}>
      {children}
    </MyContext.Provider>
  )
}

function useMyContext() {
  const context = useContext(MyContext)

  if (!context) throw new Error('useMyContext must be used within a ContextProvider')

  return context
}

export { ContextProvider, useMyContext }
