import { Request, Response } from "express";
import axios from "axios";

import app from "./index";

const baseUrl = "https://api.pexels.com/v1/curated";
const per_page = 42;

app.get("/api/curated", async function(req: Request, res: Response) {
  const { page } = req.query;
  const pageNum = (page && Number(page)) || 1;
  const url = `${baseUrl}?&per_page=${per_page}&page=${pageNum}`;

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
