import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.get('/api/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?category=${category}&country=br&max=12&apikey=${process.env.API_KEY}`
    );
    res.send(response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Something went wrong! => ', error.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
