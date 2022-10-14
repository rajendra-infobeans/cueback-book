import cognitoConfig from '../config/cognitoConfig';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        userPoolId: cognitoConfig.userPool,
        userPoolWebClientId: cognitoConfig.clientId,
        region: cognitoConfig.region,
        oauth: {
            domain: cognitoConfig.userPoolUri,
            scope: cognitoConfig.tokenScopes,
            redirectSignIn: cognitoConfig.callbackUri,
            redirectSignOut: cognitoConfig.signoutUri,
            responseType: 'code',
        },
           },
});

async function federatedSignIn(provider) {
    return await Auth.federatedSignIn({ provider }); 
}
export {federatedSignIn};