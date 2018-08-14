const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
	id: {
		type: Number,
		ref: 'Items',
		required: true,
		unique: true
	},
	title: String,
	parent: {
		type: Number,
		ref: 'Items',
	},
});

const Items = mongoose.model('Items', ItemsSchema);

module.exports = Items;