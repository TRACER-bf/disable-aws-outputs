const ref = {};

class DisableOutputs {
  constructor(serverless, options) {
    const self = this;
    ref.self = self;
    this.serverless = serverless;
    this.service = serverless.service;
    this.hooks = {
      "before:package:finalize": this.disableOutputs.bind(this),
    };
  }

  disableOutputs() {
    const cfnTemplate =
      this.serverless.service.provider.compiledCloudFormationTemplate;
    if (!cfnTemplate["Outputs"]) return;

    const retainedOutputRegex =
      this.serverless.service.custom?.retainedOutputRegex;
    if (retainedOutputRegex) {
      cfnTemplate["Outputs"] = {};
      return;
    }

    console.log(`retainedOutputRegex = ${retainedOutputRegex}`);

    Object.keys(cfnTemplate["Outputs"]).forEach((outputKey) => {
      const shouldRetain = new RegExp(retainedOutputRegex).test(outputKey);

      if (shouldRetain) {
        console.log(`Retain ${outputKey}`);
      } else {
        delete cfnTemplate["Outputs"][outputKey];
      }
    });
  }
}

module.exports = DisableOutputs;
