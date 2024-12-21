import express from "express";

const router = express.Router();

import { getTrendingTv , getTvTrailers, getTvDetails, getSimilarTvs, getTvsbyCategory} from "../controller/tv.controller.js";

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsbyCategory);

export default router;