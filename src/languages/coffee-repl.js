import coffee from 'coffee-script'
import BaseRepl from '../base-repl'

export default class CoffeeRepl extends BaseRepl{

    constructor() {
        super()

        let superExecute = this.execute

        this.execute = (input, callback) => {
            try {
                let compiled = coffee.compile(input, {bare: true, header: false})

                superExecute(compiled, callback)
            } catch (err) {
                console.log(err)

                callback({message: err.stack})
            }
        }
    }



}









