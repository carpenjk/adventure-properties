export default function handler(req, res) {
  console.log('req.body', req.body);
  // res.json({
  //   id: '1',
  //   bookedDates: [
  //     { start: new Date(2021, 10, 23), end: new Date(2021, 10, 30) },
  //   ],
  //   nearbyActivities: ['skiing', 'snowshoeing', 'hiking'],
  // });

  // if (session) {
  //   res.send({
  //     content: 'Welcome to the secret page',
  //   });
  // } else {
  //   res.send({ error: 'You need to be logged in' });
  // }
  res.send('hello?');
}
