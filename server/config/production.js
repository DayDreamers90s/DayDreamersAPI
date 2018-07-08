module.exports = {
    // disbable logging for production
    logging: false,
    secret: 'scoobydoodreamerprod',
    db: {
      url: process.env.MONGODB_URI
    },
  };
  