const express = require('express');
const bodyParser = require('body-parser');

const express_app = express();
const client = require('twilio')('ACcb2bbf1ec4e8cd9b85fc7e4420f2ee3e', '081193202595c927ed1e6ce596b3d47c');

express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());

express_app.use('/', express.static('public'));

express_app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
        .create({
            from: "+17574186902",
            to: req.body.to,
            body: req.body.message
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log('hit error');
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
});

express_app.listen(3002);
