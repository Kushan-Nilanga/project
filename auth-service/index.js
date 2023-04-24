const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

const app = express();
app.use(bodyParser.json());

// Initialize the Cognito Identity Provider
const cognito = new AWS.CognitoIdentityServiceProvider({ region: "us-east-1" });

// Route for sign-up
app.post("/api/sign-up", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create the user in Cognito
    const result = await cognito
      .signUp({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [{ Name: "email", Value: email }],
      })
      .promise();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Route for verification
app.post("/api/verify", async (req, res) => {
  try {
    const { email, code } = req.body;

    // Confirm the user's email address in Cognito
    const result = await cognito
      .confirmSignUp({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
      })
      .promise();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Route for sign-in
app.post("/api/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user in Cognito
    const result = await cognito
      .adminInitiateAuth({
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
      .promise();

    res.json({ token: result.AuthenticationResult.IdToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  // check if the environment variables are set
  if (!process.env.COGNITO_CLIENT_ID) {
    throw new Error("COGNITO_CLIENT_ID is not set");
  }
  if (!process.env.COGNITO_USER_POOL_ID) {
    throw new Error("COGNITO_USER_POOL_ID is not set");
  }

  console.log("Auth service listening on port 3000");
});
