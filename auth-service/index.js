const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

const app = express();
app.use(bodyParser.json());

// Initialize the Cognito Identity Provider
const cognito = new AWS.CognitoIdentityServiceProvider({ region: "ap-southeast-2" });

// Route for sign-up
/**
 * 1. Create the user in Cognito
 * @param req {email, password}
 * @param res 200
 */
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
/**
 * 1. Confirm the user's email address in Cognito
 * @param req {email, code}
 * @param res 200
 */
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
/**
 * 1. Authenticate the user in Cognito
 * @param req {email, password}
 * @param res {token}
 */
app.post("/api/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user in Cognito
    const result = await cognito
      .adminInitiateAuth({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
      .promise();

    res.send({ token: result.AuthenticationResult.IdToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World from Auth Service!");
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
