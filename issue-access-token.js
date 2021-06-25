const { CommunicationIdentityClient } = require('@azure/communication-identity');

const main = async () => {
  console.log("Azure Communication Services - Access Tokens Quickstart")
  // This code demonstrates how to fetch your connection string
// from an environment variable.
const connectionString = "endpoint=https://healthcarepoc.communication.azure.com/;accesskey=rAfb6slDyDnvkNIFN+COBoFPZ51AEt8WFbk3bjft8iEgM4S9KrIk0AH87zxcsFFjcZegGi/GxZqoHspQ4wTlrQ==";

// Instantiate the identity client
const identityClient = new CommunicationIdentityClient(connectionString);

// This code demonstrates how to fetch your endpoint and access key
// from an environment variable.
//const endpoint = process.env["COMMUNICATION_SERVICES_ENDPOINT"];
//const accessKey = process.env["COMMUNICATION_SERVICES_ACCESSKEY"];
//const tokenCredential = new AzureKeyCredential(accessKey);
// Instantiate the identity client
//const identityClient = new CommunicationIdentityClient(endpoint, tokenCredential)
let identityResponse = await identityClient.createUser();
console.log(`\nCreated an identity with ID: ${identityResponse.communicationUserId}`);


// Issue an identity and an access token with the "voip" scope for the new identity
let identityTokenResponse = await identityClient.createUserAndToken(["voip"]);
const { token, expiresOn, user } = identityTokenResponse;
console.log(`\nCreated an identity with ID: ${user.communicationUserId}`);
console.log(`\nIssued an access token with 'voip' scope that expires at ${expiresOn}:`);
console.log(token);

// // Value of identityResponse represents the Azure Communication Services identity stored during identity creation and then used to issue the tokens being refreshed
let refreshedTokenResponse = await identityClient.getToken(identityResponse, ["voip"]);


// await identityClient.revokeTokens(identityResponse);
// console.log(`\nSuccessfully revoked all access tokens for identity with ID: ${identityResponse.communicationUserId}`);


// await identityClient.deleteUser(identityResponse);
// console.log(`\nDeleted the identity with ID: ${identityResponse.communicationUserId}`);
  // Quickstart code goes here
};

main().catch((error) => {
  console.log("Encountered an error");
  console.log(error);
})