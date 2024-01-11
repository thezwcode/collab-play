import express from 'express'

const router = express.Router();

declare module 'express-session' {
    export interface Session {
        host: string;
        users?: string[];
        playlist?: string[];
    }
}



router.post('/create', (req, res, next) => {
    req.session.regenerate((err) => {
        if (err) next(err);

        req.session.host = req.body.host

        req.session.save((err) => {
            if (err) return next(err)
            res.redirect(process.env.CLIENT_URL)
        })
    })
})

router.put('/join', (req, res, next) => {

    req.session.users = [...req.session.users, req.body.user] || [req.body.user]
    req.session.save((err) => {
        if (err) return next(err)
        res.redirect(process.env.CLIENT_URL)
    })
})




export default router;