const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log('Event:', event);

  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const params = {
    Bucket: bucket,
    Key: key,
  };

  try {
    // Get object from S3
    const data = await s3.getObject(params).promise();
    const text = data.Body.toString('utf-8');
    const length = text.length;

    // Prepare item for DynamoDB
    const newItem = {
      id: key,
      input_text: text,
      length: length,
    };

    // Store item in DynamoDB
    await dynamo.put({
      TableName: process.env.TABLE_NAME,
      Item: newItem,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newItem),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
