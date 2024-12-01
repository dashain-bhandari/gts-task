import express from 'express'

const app = express()
const port = 3000
import ProductRouter from "../src/routes/product.route"
import OrderRouter from "../src/routes/order.route"
import cors from "cors"
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://localhost:5173",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use("/api/products", ProductRouter)
app.use("/api/orders", OrderRouter)

app.listen(port, () => {
    console.log(` app listening on port ${port}`)
})