// const express = require('express');
// const hbs = require('hbs');

// let app = express();

// hbs.registerPartials(__dirname + '/views/partials')
// app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'))
// hbs.registerHelper('getCurrentYear', () => {
//     return new Date().getFullYear()
// })

// app.get('/', (req, res) => {
//     res.render('home.hbs', {
//         title: 'welcome page',
//         welcomeMessage: 'Welcome to my website',
//     })
// })
// app.get('/about', (req, res) => {
//     res.render('about.hbs', {
//         title: 'help page',
//     })
// })

// app.listen(3000, () => {
//     console.log("Server is live on port 3000")
// })

const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

let app = express()
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('upper', (text) => {
    return text.toUpperCase()
})
app.use((req, res, next) => {
    const now = new Date().toString()
    const log = req.method + req.url
    console.log(`${now}:${log}`)
    fs.appendFile('server.log', now + ' : ' + log + '\n', (err) => {
        if (err) console.log(err)
    })
    return next()
})

// app.use((req, res, next) => {
//     res.render('maintenance')
// })
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
    res.render('home', {
        title: 'home page',
        welcomeMessage: 'Welcome to my website'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page'
    })
})

app.listen(3000, () => {
    console.log("Server is live on port 3000")
})