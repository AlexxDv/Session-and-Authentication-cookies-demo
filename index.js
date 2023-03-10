const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require("express-session");

const dataService = require("./dataService")
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.send(`
    <h1>Hello</h1>

    <p><a href="/login">Login</a></p>
    <p><a href="/register">Register</a></p>
    <p><a href="/profile">Profile</a></p>
    <p><a href="/logout">Log Out</a></p>

    `)
})

app.get('/login', (req, res) => {
    res.send(`
    <h1>Sign In</h1>
    <form method="POST">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="login" />
    </form>
    `)
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await dataService.loginUser(username, password)
        const authData = {
            username: user.username,
        }

        res.cookie('auth', JSON.stringify(authData));
        req.session.username = user.username;
        req.session.privateInfo = user.password;


        return res.redirect('/');

    } catch (err) {
        console.log();

        res.status(401).end()

    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('auth')
    res.redirect('/');
})


app.get("/register", (req, res) => {
    res.send(`
    <h1>Sign Up</h1>
    <form method="POST">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="register" />
    </form>
    `)

})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    await dataService.registerUser(username, password)

    res.redirect('/login');

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