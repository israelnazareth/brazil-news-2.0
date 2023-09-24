/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchByCategory } from "../services/fetchApi";

export interface Article {
  content: string;
  description: string;
  image: string;
  publishedAt: Date;
  source: {
    name: string;
    url: string;
  };
  title: string;
  url: string;
}

export interface Category {
  category: string;
  articles: Article[];
  label: string;
  lastTime: Date;
}

export interface Payload {
  payload: Category[];
}

export interface CategoryLabel {
  [key: string]: string;
}

type ContextType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  articles: Article[] | undefined;
  setArticles: React.Dispatch<React.SetStateAction<Article[] | undefined>>;
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;
  setDataOnLocalStorage: (category: string) => void;
  asyncLocalStorage: {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
  };
};

const MyContext = createContext<ContextType | undefined>(undefined);

const categoryLabel: CategoryLabel = {
  general: "Geral",
  world: "Mundo",
  nation: "Brasil",
  business: "Negócios",
  technology: "Tecnologia",
  entertainment: "Entretenimento",
  sports: "Esportes",
  science: "Ciência",
  health: "Saúde",
};

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[] | undefined>([]);
  const [payload, setPayload] = useState<Payload>({ payload: [] });
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const createOrUpdateCategory = async (category: string) => {
    const categoryArticles = await fetchByCategory(category);
    const payload = [
      {
        category,
        articles: categoryArticles as Article[],
        label: categoryLabel[category],
        lastTime: new Date(),
      },
    ];
    return payload;
  };

  const asyncLocalStorage = {
    setItem: async (key: string, value: string) => {
      await Promise.resolve();
      localStorage.setItem(key, value);
    },
    getItem: async (key: string) => {
      await Promise.resolve();
      return localStorage.getItem(key);
    },
  };

  const setDataOnLocalStorage = async (category: string = "general") => {
    setLoading(true);
    setTitle(categoryLabel[category]);

    const localData = await asyncLocalStorage.getItem("data");
    const parsedData = localData ? JSON.parse(localData) : null;

    if (!parsedData) {
      const payload = await createOrUpdateCategory(category);
      await asyncLocalStorage.setItem("data", JSON.stringify(payload));
      setPayload({ payload });
      setLoading(false);
    } else {
      setPayload({ payload: parsedData });
      const foundCategory: Category = parsedData.find(
        (item: Category) => item.category === category
      );
      if (!foundCategory) {
        const payload = await createOrUpdateCategory(category);
        const newPayload = [...parsedData, ...payload];
        await asyncLocalStorage.setItem("data", JSON.stringify(newPayload));
        setPayload({ payload: newPayload });
      }
      if (foundCategory) {
        const lastTime = new Date(foundCategory.lastTime);
        const now = new Date();
        const difference = now.getTime() - lastTime.getTime();
        const differenceInHours = difference / 1000 / 60 / 60;
        if (Math.floor(differenceInHours) > 6) {
          const payload = await createOrUpdateCategory(category);
          const newPayload = [...parsedData, ...payload];
          await asyncLocalStorage.setItem("data", JSON.stringify(newPayload));
          setPayload({ payload: newPayload });
        }
      }
      setLoading(false);
    }
  };

  const getNewsByCategory = async () => {
    return payload.payload.find((item) => {
      return item.label === title;
    });
  };

  useEffect(() => {
    getNewsByCategory().then((data) => {
      setArticles(data?.articles);
    });
  }, [title, payload]);

  useEffect(() => {
    setDataOnLocalStorage();
  }, []);

  const context: ContextType = {
    title,
    setTitle,
    articles,
    setArticles,
    payload,
    setPayload,
    setDataOnLocalStorage,
    loading,
    setLoading,
    asyncLocalStorage,
  };

  return <MyContext.Provider value={context}>{children}</MyContext.Provider>;
}

function useMyContext() {
  const context = useContext(MyContext);

  if (!context)
    throw new Error("useMyContext must be used within a ContextProvider");

  return context;
}

export { ContextProvider, useMyContext };
