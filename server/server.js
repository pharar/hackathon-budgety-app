/*
  Server file created for separate the app from the listening part so the test does not listen the port.
*/

const app = require('./app');

app.listen(3000, () => console.log('Web server started'));
