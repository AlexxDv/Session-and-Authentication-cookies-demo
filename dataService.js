const fs = require('fs/promises');
const bcrypt = require('bcrypt');

const db = require('./db.json');

async function saveDb() {
    const data = JSON.stringify(db, null, 2);

    await fs.writeFile('./db.json', data);

}
exports.registerUser = async (username, password) => {
    if (db.users.some(u => u.username === username)) {
        throw "User already exists!"
    };

    const salt = await bcrypt.genSalt(10);
    const hach = await bcrypt.hash(password, salt)

    db.users.push({
        username,
        password: hach,

    });

    await saveDb();
};

exports.loginUser = async (username, password) => {
    const user = db.users.find(x => x.username === username)

    if (!user) {
        throw "No such username or password"
    }

    const isAuth = await bcrypt.compare(password, user.password)

    if (!isAuth) {
        throw "No such username or password"
    }

    return user;
}
