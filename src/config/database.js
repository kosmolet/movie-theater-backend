const mongoose = require('mongoose');

const envFiles = {
  development: '.env',
  test: '.env.test',
};

require('dotenv').config({ path: envFiles[process.env.NODE_ENV] });

const connect = async () => {
  const mongoConnectionString = process.env.MONGO_URI;
  try {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoConnectionString, opts);
    logger.debug({ mongoConnectionString });
  } catch (err) {
    logger.error(`Fail to connect with database ${mongoConnectionString}`);
  }
};
module.exports = { connect };
