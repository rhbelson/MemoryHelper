const express = require('express');
const bodyParser = require('body-parser');
const scheduler = require('node-schedule');
const cluster = require('cluster');
const crypto = require('crypto');
const path = require('path');

const express_app = express();
// twilio client init
const client = require('twilio')('ACcb2bbf1ec4e8cd9b85fc7e4420f2ee3e', '081193202595c927ed1e6ce596b3d47c');

express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());
express_app.use(express.static(path.join(__dirname, 'build')));

let scheduledTasks = new Set();
let allTasks = {};

express_app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

express_app.post('/api/messages', async (req, res) => {
    console.log('Received new message request.');
    res.header('Content-Type', 'application/json');
    const textData = req.body;
    console.log(textData);
    console.log(Date.now());
    let messageCounter = 0;
    // schedule texts for all timestamps following curve
    req.body.ts.forEach(time => {
        // add 10 seconds to account for request/scheduling task offset
        scheduleText(textData, time + 10000);
        messageCounter++;
        console.log(scheduledTasks);
    });
    //
    console.log(`${allTasks.length} tasks in total are scheduled`);
    console.log({'success': true, 'messagesScheduled': messageCounter});
    // return texts scheduled
    return res.send({'success': true, 'messagesScheduled': messageCounter});
});

const scheduleText = async function(body, time) {

    const messageTime = new Date(time);
    const task_id = crypto.randomBytes(20).toString('hex');
    scheduledTasks.add(task_id);

    // run job on specific node cluster
    if (cluster.isMaster) {
        // schedule text message send
        allTasks[task_id] = scheduler.scheduleJob(messageTime, function () {
            if (scheduledTasks.has(task_id)) {
                console.log('entered task');
                // send text message with twilo service
                let newMessage = body.message + '\n\nhttps://guarded-wildwood-37078.herokuapp.com/';
                client.messages
                    .create({
                        from: "+17574186902",
                        to: body.to,
                        body: newMessage
                    })
                    .then(() => {
                        console.log(`Message to ${body.to} successfully sent.`);
                        console.log('Scheduled task canceled.');
                        // cancel task so it doesn't double send (library bug)
                        allTasks[task_id].cancel();
                        // delete task from task objects
                        delete allTasks[task_id]
                    })
                    .catch(err => {
                        console.log('hit error');
                        console.log(err);
                    });
            } else {
                console.log('Message already sent');
            }

        }.bind(null, messageTime, task_id));
        console.log(`Text scheduled at ${messageTime.toLocaleString()}.`);
        return JSON.stringify({success: true});
    }
};

// sever port is 3002
express_app.portNumber = 3002;

function startServer(port) {
    // function to start server and cycle through ports if 3002 isn't available
    express_app.portNumber = port;
    express_app.listen(process.env.PORT || port, () => {
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