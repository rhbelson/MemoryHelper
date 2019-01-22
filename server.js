const express = require('express');
const bodyParser = require('body-parser');
const scheduler = require('node-schedule');
const cluster = require('cluster');
const crypto = require('crypto');
const path = require('path');

const express_app = express();
const client = require('twilio')('ACcb2bbf1ec4e8cd9b85fc7e4420f2ee3e', '081193202595c927ed1e6ce596b3d47c');

express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());
express_app.use(express.static(path.join(__dirname, 'build')));

let scheduledTasks = new Set();

express_app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
    scheduledTasks.add(task_id);

    // run job on specific node cluster
    if (cluster.isMaster) {
        // schedule text message send
        const scheduled_task = scheduler.scheduleJob(sendTime, function () {
            if (scheduledTasks.has(task_id)) {
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

express_app.portNumber = 3002;
function startServer(port) {
    express_app.portNumber = port;
    express_app.listen(port, () => {
        console.log("server is running on port: " + express_app.portNumber);
    }).on('error', function (err) {
        if(err.errno === 'EADDRINUSE') {
            console.log(`----- Port ${express_app.portNumber} is busy, trying with port ${express_app.portNumber + 1} -----`);
            startServer(express_app.portNumber + 1)
        } else {
            console.log(err);
        }
    });
}

startServer(express_app.portNumber);