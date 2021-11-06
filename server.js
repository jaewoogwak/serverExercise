const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();


app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        },
    ],
    login : [
        {
            id : '987',
            hash : '',
            email : 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", '$', function(err, res) {
        console.log('first guess', '$2a$10$acHLg/8x5ckWYudECb.OiumuWts5GmZwVbyv5zlMCtGOG/HnLxIA.', res);
    });
    bcrypt.compare("begggis", '$2a$10$acHLg/8x5ckWYudECb.OiumuWts5GmZwVbyv5zlMCtGOG/HnLxIA.', function(err, res) {
        console.log('second guess', res);
    })

    database.users.forEach(user => {
        if (user.email === req.body.email) {
            if (user.password === req.body.password) {
                return res.json('success');
            }
        }
    })
    res.status(400).json('error logging in');
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    })
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user)
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/