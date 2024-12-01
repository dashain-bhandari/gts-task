import express from "express"
import { getAllProductsHandler, getCourierChargesHandler } from "../controllers/product.controller";

const router = express.Router();

router.get("/courier-charges", getCourierChargesHandler)

router.get("/", getAllProductsHandler)

export default router;