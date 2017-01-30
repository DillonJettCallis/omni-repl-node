import cljs  from 'clojurescript'
import BaseRepl from '../base-repl'

export default class ClojureRepl extends BaseRepl {

    constructor() {
        super()

        let context = cljs.newContext()

        this.execute = (input, callback) => {
            try {
                let result = cljs.eval(input, context)

                Promise.resolve(result).then(result => {
                    console.log(result)

                    let message = JSON.stringify(result)

                    callback({message})
                })
            } catch (err) {
                console.log(err)

                let message = err.stack

                callback({message})
            }
        }
    }
}

