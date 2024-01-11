import express from 'express'

// to deter CSRF
export const generateRandomString = function (length) {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


const router = express.Router();


router.get('/login', (req, res) => {

    const scope = "streaming \
                 user-read-email \
                 user-read-private"

    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: `http://localhost:${process.env.PORT}/auth/callback`,
        state: state
    })

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})



router.get('/callback', (req, res) => {
    const { code } = req.query;

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            code: code.toString(),
            redirect_uri: `http://localhost:${process.env.PORT}/auth/callback`,
            grant_type: 'authorization_code'
        })
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`token request failed: ${response}`)
        }
        if (response.status === 200) {
            response.json().then((data) => {
                console.log(data);
                global.access_token = data.access_token
            });
            res.redirect("http://localhost:5173")
        }

    });
})

router.get('/token', (req, res) => {
    if (global.access_token !== "") {
        res.send({ access_token: global.access_token })
    } else {
        res.redirect("http://localhost:5173")
    }

})



export default router