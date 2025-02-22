import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser"
import hallRoute from "./routes/halls.route.js"
import authRouter from "./routes/auth.router.js"
import bookingRoute from './routes/booking.router.js'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/hall", hallRoute)
app.use("/api/auth", authRouter)
app.use("/api/booking", bookingRoute)

app.listen(4444, () => {
    console.log('server is running')
})
