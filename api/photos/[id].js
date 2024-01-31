import express from "express";
import axios from "axios";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/photos/:id", async function getPhoto(req, res) {
  const { id } = req.params;

  try {
    const response = await axios.get(process.env.NUXT_ENV_API_URL);
    const result = response.data.photos.find(
      (photo) => photo.id === Number(id)
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(error.response ? error.response.status : 404).json({
      error: error.response ? error.response.statusText : "404 Not Found",
    });
  }
});

export default app;
