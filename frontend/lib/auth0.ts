'use client'
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';

let auth0Client: any;

export const initAuth0 = async () => {
  auth0Client = await createAuth0Client({
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
    authorizationParams: {
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      redirect_uri: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL!
    }
  });
  return auth0Client;
};

export const getAuth0Client = async (): Promise<Auth0Client> => {
  if (!auth0Client) {
    await initAuth0();
  }
  return auth0Client!;
};