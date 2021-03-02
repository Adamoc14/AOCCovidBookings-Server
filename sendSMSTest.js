// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "ACcfb52478a684c256c734d8a6c6e1d374";
const authToken = "f01336b895ac35b06ac4f9880e877f3d";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Testing, lets gooooo',
     from: '+15017125942',
     to: '+353851152225'
   })
  .then(message => console.log(message.sid));
