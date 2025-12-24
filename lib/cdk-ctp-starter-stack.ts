import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class CdkCtpStarterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
    });

    const api = new apigw.RestApi(this, 'HelloApi', {
      restApiName: 'cdk-ctp-api',
    });

    const helloResource = api.root.addResource('hello');
    helloResource.addMethod(
      'GET',
      new apigw.LambdaIntegration(helloLambda)
    );
  }
}
