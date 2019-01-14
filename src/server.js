const express = require('express');
const bodyParser = require('body-parser');
const scheduler = require('node-schedule');
const cluster = require('cluster');

const express_app = express();
const client = require('twilio')('ACcb2bbf1ec4e8cd9b85fc7e4420f2ee3e', '081193202595c927ed1e6ce596b3d47c');

express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());

express_app.use('/', express.static('public'));

express_app.post('/api/messages', (req, res) => {
    console.log('Received new message request.');
    res.header('Content-Type', 'application/json');
    console.log(req.body);
    return res.send(scheduleText(req.body));
});

const scheduleText = function(body) {
    // create date object from post request
    const sendTime = new Date(body.dueDate);
    // run job on specific node clustor
    if(cluster.isMaster) {
        // schedule text message send
        scheduler.scheduleJob(sendTime, function () {
            // send text message with twilo service
            client.messages
                .create({
                    from: "+17574186902",
                    to: body.to,
                    body: body.message
                })
                .then(() => {
                    console.log(`Message to ${body.to} successfully sent.`);
                    // return JSON.stringify({success: true});
                })
                .catch(err => {
                    console.log('hit error');
                    console.log(err);
                    // return JSON.stringify({success: false});
                });
        });
    }
    console.log('Text scheduled.');
    return JSON.stringify({success: true});
};

express_app.listen(3002);
