"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyNewCdkProjectStack = void 0;
const cdk = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const lambda = require("aws-cdk-lib/aws-lambda");
const s3n = require("aws-cdk-lib/aws-s3-notifications");
const apigateway = require("aws-cdk-lib/aws-apigateway");
class MyNewCdkProjectStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create an S3 bucket with versioning enabled
        const bucket = new s3.Bucket(this, 'mybucket', {
            versioned: true,
        });
        // Create a Lambda function that logs events
        const lambdaFunction = new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('lambda'),
        });
        // Grant the Lambda function read permissions to the S3 bucket
        bucket.grantRead(lambdaFunction);
        // Set up an event notification to trigger the Lambda function on object creation
        bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(lambdaFunction));
        // Create an API Gateway REST API to trigger the Lambda function via HTTP
        const api = new apigateway.RestApi(this, 'my-api', {
            restApiName: 'My Service',
            description: 'This service serves my Lambda function.',
        });
        // Integrate the Lambda function with the API Gateway
        const getLambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction, {
            requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
        });
        // Create a GET method on the API root resource
        api.root.addMethod('GET', getLambdaIntegration);
    }
}
exports.MyNewCdkProjectStack = MyNewCdkProjectStack;
const app = new cdk.App();
new MyNewCdkProjectStack(app, 'MyNewCdkProjectStack', {
    env: {
        account: 'MahtabPNMExample', // replace with your AWS account ID
        region: 'MpN88842572!' // replace with your desired AWS region, e.g., 'us-east-1'
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktbmV3LWNkay1wcm9qZWN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXktbmV3LWNkay1wcm9qZWN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyx5Q0FBeUM7QUFDekMsaURBQWlEO0FBQ2pELHdEQUF3RDtBQUN4RCx5REFBeUQ7QUFFekQsTUFBYSxvQkFBcUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNqRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDhDQUE4QztRQUM5QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUM3QyxTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7UUFFSCw0Q0FBNEM7UUFDNUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDN0QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsZUFBZTtZQUN4QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ3RDLENBQUMsQ0FBQztRQUVILDhEQUE4RDtRQUM5RCxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWpDLGlGQUFpRjtRQUNqRixNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUVwRyx5RUFBeUU7UUFDekUsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDakQsV0FBVyxFQUFFLFlBQVk7WUFDekIsV0FBVyxFQUFFLHlDQUF5QztTQUN2RCxDQUFDLENBQUM7UUFFSCxxREFBcUQ7UUFDckQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUU7WUFDNUUsZ0JBQWdCLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSx5QkFBeUIsRUFBRTtTQUNwRSxDQUFDLENBQUM7UUFFSCwrQ0FBK0M7UUFDL0MsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNGO0FBcENELG9EQW9DQztBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUksb0JBQW9CLENBQUMsR0FBRyxFQUFFLHNCQUFzQixFQUFFO0lBQ3BELEdBQUcsRUFBRTtRQUNILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQ0FBbUM7UUFDaEUsTUFBTSxFQUFFLGNBQWMsQ0FBQywwREFBMEQ7S0FDbEY7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgczNuIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMy1ub3RpZmljYXRpb25zJztcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuXG5leHBvcnQgY2xhc3MgTXlOZXdDZGtQcm9qZWN0U3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBDcmVhdGUgYW4gUzMgYnVja2V0IHdpdGggdmVyc2lvbmluZyBlbmFibGVkXG4gICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnbXlidWNrZXQnLCB7IC8vIGVuc3VyZSBidWNrZXQgbmFtZSBpcyB2YWxpZFxuICAgICAgdmVyc2lvbmVkOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgTGFtYmRhIGZ1bmN0aW9uIHRoYXQgbG9ncyBldmVudHNcbiAgICBjb25zdCBsYW1iZGFGdW5jdGlvbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ015RnVuY3Rpb24nLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgfSk7XG5cbiAgICAvLyBHcmFudCB0aGUgTGFtYmRhIGZ1bmN0aW9uIHJlYWQgcGVybWlzc2lvbnMgdG8gdGhlIFMzIGJ1Y2tldFxuICAgIGJ1Y2tldC5ncmFudFJlYWQobGFtYmRhRnVuY3Rpb24pO1xuXG4gICAgLy8gU2V0IHVwIGFuIGV2ZW50IG5vdGlmaWNhdGlvbiB0byB0cmlnZ2VyIHRoZSBMYW1iZGEgZnVuY3Rpb24gb24gb2JqZWN0IGNyZWF0aW9uXG4gICAgYnVja2V0LmFkZEV2ZW50Tm90aWZpY2F0aW9uKHMzLkV2ZW50VHlwZS5PQkpFQ1RfQ1JFQVRFRCwgbmV3IHMzbi5MYW1iZGFEZXN0aW5hdGlvbihsYW1iZGFGdW5jdGlvbikpO1xuXG4gICAgLy8gQ3JlYXRlIGFuIEFQSSBHYXRld2F5IFJFU1QgQVBJIHRvIHRyaWdnZXIgdGhlIExhbWJkYSBmdW5jdGlvbiB2aWEgSFRUUFxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgJ215LWFwaScsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiAnTXkgU2VydmljZScsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgc2VydmljZSBzZXJ2ZXMgbXkgTGFtYmRhIGZ1bmN0aW9uLicsXG4gICAgfSk7XG5cbiAgICAvLyBJbnRlZ3JhdGUgdGhlIExhbWJkYSBmdW5jdGlvbiB3aXRoIHRoZSBBUEkgR2F0ZXdheVxuICAgIGNvbnN0IGdldExhbWJkYUludGVncmF0aW9uID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24sIHtcbiAgICAgIHJlcXVlc3RUZW1wbGF0ZXM6IHsgJ2FwcGxpY2F0aW9uL2pzb24nOiAneyBcInN0YXR1c0NvZGVcIjogXCIyMDBcIiB9JyB9LFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgR0VUIG1ldGhvZCBvbiB0aGUgQVBJIHJvb3QgcmVzb3VyY2VcbiAgICBhcGkucm9vdC5hZGRNZXRob2QoJ0dFVCcsIGdldExhbWJkYUludGVncmF0aW9uKTtcbiAgfVxufVxuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xubmV3IE15TmV3Q2RrUHJvamVjdFN0YWNrKGFwcCwgJ015TmV3Q2RrUHJvamVjdFN0YWNrJywge1xuICBlbnY6IHsgXG4gICAgYWNjb3VudDogJ01haHRhYlBOTUV4YW1wbGUnLCAvLyByZXBsYWNlIHdpdGggeW91ciBBV1MgYWNjb3VudCBJRFxuICAgIHJlZ2lvbjogJ01wTjg4ODQyNTcyIScgLy8gcmVwbGFjZSB3aXRoIHlvdXIgZGVzaXJlZCBBV1MgcmVnaW9uLCBlLmcuLCAndXMtZWFzdC0xJ1xuICB9LFxufSk7XG4iXX0=