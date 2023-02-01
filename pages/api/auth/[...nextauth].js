// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { processEnv } from '@next/env';
import clientPromise from '../../../utils/mongodb';

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  debug: true,
  theme: {
    colorScheme: 'dark',
    brandColor: '#696f92', // Hex color code
    logo: '/static/assets/LogoMain.svg', // Absolute URL to image
  },
  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60, // the session will last 30 days
    maxAge: 1 * 60 * 60, // the session will last 30 days
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_DOMAIN,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
});
