var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require('http').Server(app);
const cors = require('cors');
// const userController = require('./controllers/userController');
const notificationController = require('./controllers/notificationController');
const webpush = require('web-push');

const fakeDatabase = []

const vapidKeys = {
    "publicKey":"BECIhe7HE1lj3oIy4EHjCiLV0r8M5q4EbMRSzKHVjLMo-5u70-BSvzQprJAgkhwgWL6HRq02NnVBQCyvAmxNqU4",
    "privateKey":"AHUt3oQe1KbM0Cc8sR9tDzBdUNDStA2Py-QPmMvS5DE"
};

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('access-Control-Allow-Origin', '*');
  next();
});

app.post('/subscription', (req, res) => {
    const subscription = req.body;
    fakeDatabase.push(subscription);
});

app.post('/sendNotification', (req, res) => {
    const notificationPayload = {
      notification: {
        title: 'New Notification',
        body: 'This is the body of the notification',
        icon: 'assets/icons/icon-512x512.png',
      },
    };
  
    const promises = [];
    fakeDatabase.forEach(subscription => {
      promises.push(
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        )
      )
    });
    Promise.all(promises).then(() => res.sendStatus(200));
});

app.use('/', express.static(__dirname + '/angular-push-notifications/dist/angular-push-notifications'));


// ADDasdasdsadsads


http.listen(port, function(){
    console.log('listening on *: ' + port);
});
  