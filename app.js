const express = require('express')
const bodyParser = require(`body-parser`)
const { check, validationResult } = require('express-validator')

const app = express()
const port = 5000

app.set('view engine', 'ejs')

const urlEncodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', urlEncodedParser, [
    check('username', 'The username must be 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()

        res.render('register', {
            alert
        })
    }
})

app.listen(port, () => console.info(`App running on port:${port}`))