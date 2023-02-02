const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

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

    }

    res.status(401).end()
})