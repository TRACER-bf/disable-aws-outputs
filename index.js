const ref = {}

class DisableOutputs {

    constructor(serverless, options) {
        const self = this
        ref.self = self
        this.serverless = serverless
        this.service = serverless.service
        this.hooks = {
            'before:package:finalize': this.disableOutputs.bind(this)
        }

    }

    disableOutputs() {
        const cfnTemplate = this.serverless.service.provider.compiledCloudFormationTemplate
        cfnTemplate["Outputs"] = {}
    }


}

module.exports = DisableOutputs
