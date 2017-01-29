import express from "express";
import bodyParser from "body-parser";
import uuid from 'node-uuid'
import BabelRepl from './languages/babel-repl'
import CoffeeRepl from './languages/coffee-repl'
import TypescriptRepl from './languages/typescript-repl'

const app = express()


app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let languages = {
    javascript: BabelRepl,
    coffeescript: CoffeeRepl,
    typescript: TypescriptRepl
}

let sessionMap = {}

app.get('/session/:lang', (req, res) => {

    let lang = req.params.lang
    let repl = languages[lang]

    if(!repl) {
        res.send(`Language: ${lang} not supported`)
        res.end()
        return
    }

    let sessionId = uuid.v4()

    sessionMap[sessionId] = new repl()

    res.send({ sessionId })
    res.end()
})

app.post('/execute', (req, res) => {

    let body = req.body

    if ((!body) || (!body.input)) {
        res.statusCode = 400
        res.send('No input specified')
        res.end()
        return
    }

    let sessionId = body.sessionId

    let session = sessionMap[sessionId]

    if(!session) {
        res.statusCode = 400
        res.send('Invalid session')
        res.end()
        return
    }

    let input = body.input

    session.execute(input, result => {
        res.send(result)
        res.end()
    })

})


app.listen(3500, () => console.log('Ready ...'))
