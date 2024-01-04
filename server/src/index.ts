import express from 'express'
import { config as dotenvConfig } from 'dotenv'
import authRouter from './router/authRouter'
import cors from 'cors'
import bodyParser from 'body-parser';

dotenvConfig();


const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use('/auth', authRouter)

app.get("/", (req, res) => {
  res.send("Invalid url");
})


app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
