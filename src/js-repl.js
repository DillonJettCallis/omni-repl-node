import * as babel from 'babel-core'
import BaseRepl from './base-repl'

export default class JsRepl extends BaseRepl {

    constructor() {
        super()

        let superExecute = this.execute

        this.execute = (input, callback) => {
            let compiled = babel.transform(input, {'presets': ['latest-minimal']})

            superExecute(compiled.code, callback)
        }
    }
}