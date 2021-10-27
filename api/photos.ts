import { Request, Response } from "express";
import axios from "axios";

import app from "./index";

const baseUrl = "https://api.pexels.com/v1/";
const per_page = 25;

app.get("/api/photos", async function(req: Request, res: Response) {
  const { query, page } = req.query;
  const pageNum = (page && Number(page)) || 1;
  const url = `${baseUrl}search?query=${query}&per_page=${per_page}&page=${pageNum}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: process.env.NUXT_ENV_PEXELS_API || ""
      }
    });
    res.send(response.data);
  } catch (err) {
    const error = err as any;
    console.log(err);
    res.status(error.response ? error.response.status : 404).json({
      error: error.response ? error.response.statusText : "404 Not Found"
    });
  }
});

app.get("/api/photos/:id", async function(req: Request, res: Response) {
  const { id } = req.params;
  const url = `${baseUrl}/photos/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: process.env.NUXT_ENV_PEXELS_API || ""
      }
    });
    res.send(response.data);
  } catch (err) {
    const error = err as any;
    console.log(err);
    res.status(error.response ? error.response.status : 404).json({
      error: error.response ? error.response.statusText : "404 Not Found"
    });
  }
});

export default app;
