import express from 'express'
const cors = require("cors")
const bodyParser = require("body-parser")
import { connectDB } from "./db"

// App Config
const app = express()
const port = 5000

let corsConfig = {
    origin: '*',
    optionsSuccessStatus: 200
}

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors(corsConfig))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/static', express.static('public'))

// Local Routes
app.get("/", (req: express.Request, res: express.Response) => {
    res.send("This is the main route for the Express Template V1 running JS")
})

// Routes
const auth_route = require("./routes/auth")
const company_route = require("./routes/company")
const news_route = require("./routes/news")

app.use("/auth", auth_route)
app.use("/company", company_route)
app.use("/news", news_route)

// Run app
app.listen(port, () => {
    console.log(`App running on ${port}`)
})