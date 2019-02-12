This app leverages the Ebbinghaus forgetting curve to remind users to complete tasks and includes a flash-card interface to help memorize desired materials

https://guarded-wildwood-37078.herokuapp.com/


### Requirements:
Make sure you have versions of react and react-dom over 16.0.0. Use `npm install` to install all other required packages.

### Deploying
* `npm install` to install required dependencies.
* `node server.js` to start the express backend server.
* `npm start` to start the react app.

**Note:** The react development server is on `localhost:3000` and the static react build is on `localhost:3002`. Both builds proxy their requests to `localhost:3002`, the express server.
