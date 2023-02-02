const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.get('/', (req, res) => {
    res.send(`
    <h1>Hello</h1>

    <p><a href="/login">Login</a></p>
    <p><a href="/profile">Profile</a></p>

    `)
})

app.get('/login', (req, res) => {
    res.send(`
    <form method="POST">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="login" />
    </form>
    `)
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username == "Ivan" && password == "peti") {
        const authData = {
            username: "Ivan",
        }
        res.cookie('auth', JSON.stringify(authData)); 
        req.session.username = "Ivan";
        req.session.privateInfo = "Some Private Info";
        res.redirect('/');
    }

    return res.status(401).end()
})

app.get('/profile', (req, res) => {

    const authData = req.cookies['auth'];
    if (!authData) {
        return res.status(401).end();
    }

    const { username } = JSON.parse(authData);

    console.log(req.session);

    res.send(`
    <h2>Hello - ${username}</h2>
    `)
})

app.listen(5000, () => console.log('Server is listening on port 5000'));