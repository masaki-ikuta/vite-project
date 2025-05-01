import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "ap-northeast-1", // 東京リージョン
});

export default dynamoDB;