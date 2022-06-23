import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });
  console.log('🚀 ~ file: index.js ~ line 5 ~ session', session);

  if (session) {
    res.send({
      content: 'Welcome to the secret page',
    });
  } else {
    res.send({ error: 'You need to be logged in' });
  }
};
