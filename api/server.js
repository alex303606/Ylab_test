const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const items = require('./app/items');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.db.url + '/' + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;
const port = 4040;

db.once('open', () => {
	console.log('Mongoose connected!');
	app.use('/items', items());
	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
});