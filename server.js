const express = require('express');
const sequelize = require('./config');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
// Connect to the database prior to starting the server
// Foce the database to drop/recreate the table whenever we start or restart our server - NEVER TURN THIS ON IN PRODUCTION
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});
