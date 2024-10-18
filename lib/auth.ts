"use-server";
import AuthSession from 'expo-auth-session';

const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
const [request, response, promptAsync] = AuthSession.useAuthRequest(
  {
    clientId: '<GOOGLE_CLIENT_ID>',
    scopes: ['profile', 'email'],
    redirectUri: AuthSession.makeRedirectUri({ scheme: "my-scheme", path: "redirectauth"})
  },
  discovery
);
