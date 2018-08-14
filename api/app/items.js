const express = require('express');
const Items = require('../models/items');
const router = express.Router();

const createRouter = () => {
	
	router.get('/', (req, res) => {
		Items.find()
		.then(result => {
			if (result) res.send(result);
			else res.sendStatus(404);
		})
		.catch(() => res.sendStatus(500));
	});
	
	router.put('/:id', (req, res) => {
		const item = req.body;
		Items.findOneAndUpdate({_id: req.params.id}, item)
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
	});
	
	return router;
};

module.exports = createRouter;