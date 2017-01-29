import vm from "vm";

export default class ReplSession {

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

                console.log(result)

                let body = JSON.stringify(result)

                let message = consoleOutput + body

                consoleOutput = ''

                callback({message})
            } catch (err) {
                console.log(err)

                let message = consoleOutput + err.stack

                consoleOutput = ''

                callback({message})
            }
        }
    }





}



