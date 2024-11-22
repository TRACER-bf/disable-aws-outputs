class DisableOutputs {
  constructor(serverless, options) {
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

    const retainedOutputs =
      this.serverless.service.custom?.retainedOutputs || [];

    Object.keys(cfnTemplate["Outputs"]).forEach((outputKey) => {
      if (retainedOutputs.includes(outputKey)) {
        console.log(`${outputKey} is retained.`);
        return;
      }
      delete cfnTemplate["Outputs"][outputKey];
    });
  }
}

module.exports = DisableOutputs;
