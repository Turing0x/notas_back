const MESSAGES = require('../assets/messages.defines');

const sendRes = ( res, status, success, message, data = [] ) => {
  res.status(status).json({
    success: success,
    api_message: MESSAGES[message],
    data
  });
}

module.exports = sendRes;