import express from 'express'

const router = express.Router()

router.get("/", (req, res) => {
    res.send(req.session.playlist);
})


router.post("/add", (req, res, next) => {
    req.session.playlist = [...req.session.playlist, req.body.songUri];
    req.session.users.forEach(user => res.send(req.session.playlist))
})


export default router;