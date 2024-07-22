import React, { useState } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';

function App() {
  const [text, setText] = useState('');
  const S3_BUCKET = 'your-bucket-name';
  const REGION = 'us-east-2';

  // Configure the AWS SDK
  AWS.config.update({
    region: REGION,
    credentials: new AWS.Credentials('AKIA47CRUIO7ABN43LVH', 'MpN88842572'),
  });

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    const fileName = 'example.txt';
    await sendDataToApiGateway(fileName);
  };

  const sendDataToApiGateway = async (fileName) => {
    try {
      const response = await axios.post('https://oimlhxjfx1.execute-api.us-east-2.amazonaws.com/prod/items', {
        text: text,
        fileName: fileName,
        s3Uri: `s3://${S3_BUCKET}/${fileName}`
      });
      console.log('API Gateway Response:', response.data);
    } catch (error) {
      console.error('Error sending data to API Gateway:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <textarea value={text} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
      </header>
    </div>
  );
}

export default App;
