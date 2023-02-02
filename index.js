const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send(`
    <h1>Hello Ivan</h1>

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
            username: Ivan,
        }
        res.cookie('auth', JSON.stringify(authData));
        res.redirect('/');
    }

    res.status(401).end()
})

app.get('/profile', (req, res) => {

})