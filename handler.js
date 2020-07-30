import { getNews } from './createNewsPage.js';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
export const publishDailyNewsPage = async (event, context) => {
  const date = new Date();
  const fileName = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.html`;
  const params = {
    Body: await getNews(),
    ContentType: 'text/html',
    Bucket: "cloudconcepts.org/tech-news",
    Key: fileName
   };
   await s3.putObject(params, (err, data) => {
    if (err) {
      console.log('Error in uploading file on s3 due to ', err);
    } else {
     console.log('s3 upload successful', data);
    }
  }).promise();
  return {
    message: 'S3 file created',
    input: event,
  };
};
