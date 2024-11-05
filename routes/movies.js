const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/';

router.get("/now-playing", auth, async (req, res) => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
        params: {
          api_key: process.env.TMDB_API_KEY
        }
      });
      res.json({
        user: req.user, 
        movies: response.data
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get("/popular", auth, async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: process.env.TMDB_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/credits/:movieId", auth, async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${req.params.movieId}/credits`, 
      {
        params: {
          api_key: process.env.TMDB_API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 