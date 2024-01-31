import express from "express";
import axios from "axios";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/curated", async function getCuratedPhotos(req, res) {
  try {
    const response = await axios.get(process.env.NUXT_ENV_API_URL);
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(error.response ? error.response.status : 404).json({
      error: error.response ? error.response.statusText : "404 Not Found",
    });
  }
});

export default app;
