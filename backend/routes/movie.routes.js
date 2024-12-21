import express from "express";

const router = express.Router();

import { getTrendingMovie , getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesbyCategory} from "../controller/movie.controller.js";

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesbyCategory);

export default router;