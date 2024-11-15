import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

dotenv.config();

if (!process.env.API_KEY) {
  console.error('API_KEY is not defined in .env file');
  process.exit(1);
}

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const validCategories = ['general', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

app.get('/api/:category', async (req, res) => {
  try {
    const { category } = req.params;

    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Primeiro, tenta buscar do banco de dados
    let news = await prisma.news.findMany({
      where: { category },
      orderBy: { publishedAt: 'desc' }
    });

    // Se não houver notícias no banco ou se elas tiverem mais de 6 horas
    // desde quando elas foram resgatadas, faz uma nova requisição
    const shouldFetchNew = news.length === 0 || 
      news.every((article: any) => {
        const createdAt = new Date(article.createdAt);
        const now = new Date();
        return now.getTime() - createdAt.getTime() > 6 * 60 * 60 * 1000;
      });

    if (shouldFetchNew) {
      const response = await axios.get<{ articles: NewsArticle[] }>(
        `https://gnews.io/api/v4/top-headlines?category=${category}&country=br&max=12&apikey=${process.env.API_KEY}`
      );

      if (!response.data?.articles) {
        throw new Error('Invalid API response format');
      }

      // Deleta notícias com mais de 1 mês de criação
      await prisma.news.deleteMany({
        where: {
          category,
          createdAt: {
            lt: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000)
          }
        }
      });

      // Insert new articles
      const articles = response.data.articles;
      const newsToCreate = articles.map((article: NewsArticle) => ({
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        image: article.image,
        publishedAt: article.publishedAt,
        source: article.source.name,
        category
      }));

      await prisma.news.createMany({
        data: newsToCreate
      });

      news = await prisma.news.findMany({
        where: { category },
        orderBy: { publishedAt: 'desc' }
      });
    }

    res.json(news);
  } catch (error: unknown) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
