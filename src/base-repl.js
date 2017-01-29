import vm from "vm";

export default class BaseRepl {

    execute;

    constructor() {

        let context = vm.createContext()


        let consoleOutput = ''

        let consoleFunc = (...args) => {
            consoleOutput += args.map(it => {
                    if (typeof it === 'string')
                        return it
                    else
                        return JSON.stringify(it);
                }).join('') + '\n'
        }

        let consoleBody = {};

        ['error', 'warn', 'info', 'log', 'debug'].forEach(fun => consoleBody[fun] = consoleFunc)

        context['console'] = consoleBody

        this.execute = (input, callback) => {
            try {
                let result = vm.runInContext(input, context, {filename: 'repl', displayErrors: true, timeout: 1000 * 60})

                //Result may be a promise. If it is, then using resolve will wait until
                // it's finished to return, otherwise it does no harm.
                Promise.resolve(result).then(result => {
                    console.log(result)

                    let body = JSON.stringify(result)

                    let message = consoleOutput + body

                    consoleOutput = ''

                    callback({message})
                })


            } catch (err) {
                console.log(err)

                let message = consoleOutput + err.stack

                consoleOutput = ''

                callback({message})
            }
        }
    }





}



