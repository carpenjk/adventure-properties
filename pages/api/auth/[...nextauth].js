// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.NEXTAUTH_URL,
  debug: true,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // the session will last 30 days
  },
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  database: process.env.DATABASE_URI,
};

export default (req, res) => NextAuth(req, res, options);
