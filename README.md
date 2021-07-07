# disable-aws-outputs

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Serverless plugin to disable default aws outputs from sls

## Usage

Install the plugin to your project:

    npm install disable-aws-outputs --save

Add the plugin and its configuration to your serverless project:

    plugins:
      - disable-aws-outputs


### Output to be removed

Next are the outputs that will be removed:

```json
{
    ServerlessDeploymentBucketName: { Value: 'anyval' },
    DoDashloansDashpaymentDashhttpLambdaFunctionQualifiedArn: {
        Description: 'Current Lambda function version',
        Value: {
            Ref: 'DoDashloansDashpaymentDashhttpLambdaVersionJciX2bVN'
        }
    }
}
`
