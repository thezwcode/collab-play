import express from 'express'
import { config as dotenvConfig } from 'dotenv'
import authRouter, { generateRandomString } from './router/authRouter'
import sessionRouter from './router/sessionRouter'
import cors from 'cors'
import session from 'express-session';

dotenvConfig();


const app = express();
const sessionMiddleware = session({ secret: generateRandomString(16), resave: false, saveUninitialized: true, cookie: { domain: process.env.CLIENT_URL } })


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(sessionMiddleware);

app.use('/auth', authRouter)

app.use('/session', sessionRouter)

app.get("/", (req, res) => {
  res.send("Invalid url");
})


app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});


