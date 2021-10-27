import express from "express";
import axios from "axios";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const baseUrl = "https://api.pexels.com/v1/curated";
const per_page = 25;

app.get("/api/curated", async function getCuratedPhotos(req, res) {
  const { page } = req.query;
  const pageNum = (page && Number(page)) || 1;
  const url = `${baseUrl}?page=${pageNum}&per_page=${per_page}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: process.env.NUXT_ENV_PEXELS_API || ""
      }
    });
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(error.response ? error.response.status : 404).json({
      error: error.response ? error.response.statusText : "404 Not Found"
    });
  }
});

export default app;
