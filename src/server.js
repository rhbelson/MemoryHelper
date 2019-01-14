const express = require('express');
const bodyParser = require('body-parser');
const scheduler = require('node-schedule');
const cluster = require('cluster');
const crypto = require('crypto');

const express_app = express();
const client = require('twilio')('ACcb2bbf1ec4e8cd9b85fc7e4420f2ee3e', '081193202595c927ed1e6ce596b3d47c');

express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());

let scheduled_tasks = new Set();

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
    const task_id = crypto.randomBytes(20).toString('hex');
    scheduled_tasks.add(task_id);

    // run job on specific node clustor
    if (cluster.isMaster) {
        // schedule text message send
        const scheduled_task = scheduler.scheduleJob(sendTime, function () {

            if (scheduled_tasks.has(task_id)) {
                // send text message with twilo service
                client.messages
                    .create({
                        from: "+17574186902",
                        to: body.to,
                        body: body.message
                    })
                    .then(() => {
                        console.log(`Message to ${body.to} successfully sent.`);
                        console.log('Scheduled task canceled.');
                        scheduled_task.cancel();
                    })
                    .catch(err => {
                        console.log('hit error');
                        console.log(err);
                    });
            } else {
                console.log('Message already sent');
            }

        });

        console.log('Text scheduled.');
        return JSON.stringify({success: true});
    }
};

express_app.listen(3002);
