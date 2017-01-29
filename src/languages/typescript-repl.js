import ts from 'typescript'
import BaseRepl from '../base-repl'

export default class TypescriptRepl extends BaseRepl {

    constructor() {
        super()

        let superExecute = this.execute

        this.execute = (input, callback) => {
            let compiled = ts.transpileModule(input, { reportDiagnostics: true, compilerOptions: { module: ts.ModuleKind.CommonJS } })

            console.log(JSON.stringify(compiled));

            superExecute(compiled.outputText, callback)
        }
    }
}



