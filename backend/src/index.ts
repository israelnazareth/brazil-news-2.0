import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

async function fetchWithApiKey(category: string, keyNumber: number): Promise<any> {
  const apiKey = process.env[`API_KEY_${keyNumber}`];

  if (!apiKey) {
    throw new Error(`API_KEY_${keyNumber} não está definida no arquivo .env`);
  }

  return axios.get(
    `https://gnews.io/api/v4/top-headlines?category=${category}&country=br&max=12&apikey=${apiKey}`
  );
}

app.get('/api/:category', async (req, res) => {
  const { category } = req.params;
  let lastError = null;

  for (let i = 1; i <= 8; i++) {
    try {
      const response = await fetchWithApiKey(category, i);
      return res.send(response.data);
    } catch (error: unknown) {
      lastError = error;
      console.error(`Falha com API_KEY_${i}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  console.error('Todas as chaves de API falharam');
  return res.status(500).json({
    error: "Não foi possível obter dados após tentar com todas as chaves de API",
    details: lastError instanceof Error ? lastError.message : 'Erro desconhecido'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
