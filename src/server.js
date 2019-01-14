const express = require('express');
const bodyParser = require('body-parser');
const scheduler = require('node-schedule');

const express_app = express();
const client = require('twilio')('ACcb2bbf1ec4e8cd9b85fc7e4420f2ee3e', '081193202595c927ed1e6ce596b3d47c');

express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());

express_app.use('/', express.static('public'));

express_app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    console.log(req.body);
    res.send(scheduleText(req.body));
});

const scheduleText = function(body) {
    // create date object from post request
    const sendTime = new Date(body.dueDate);
    // schedule text message send
    scheduler.scheduleJob(sendTime, function() {
        // send text message with twilo service
        client.messages
            .create({
                from: "+17574186902",
                to: body.to,
                body: body.message
            })
            .then(() => {
                console.log(`message to ${body.to} successfully sent.`);
                return JSON.stringify({success: true});
            })
            .catch(err => {
                console.log('hit error');
                console.log(err);
                return JSON.stringify({success: false});
            });
    });
    console.log('Text scheduled.');
};

express_app.listen(3002);
