import express from "express";
import cors from "cors";
// import ollama from "ollama"
import routerAgents from './routes/valorant.route.js'
import routerRiot from './routes/riot.router.js'

const app = express()

app.use(cors({ origin: 'http://localhost:5174', credential: true }))



app.use('/api', routerAgents)
app.use('/api/riot', routerRiot)

app.listen(4444, () => {
    console.log("Сервер запущен на порту 4444");
});