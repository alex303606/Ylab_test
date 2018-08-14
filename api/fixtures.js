const mongoose = require('mongoose');
const config = require('./config');

const Items = require('./models/items');

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
	try {
		await db.dropCollection('items');
	} catch (e) {
		console.log('Collections were not present, skipping drop...');
	}
	
	const items = [
		{_id: 10, title: 'Четвертый пункт', parent:1},
		{_id: 7, title: 'Вложенный подпункт 2.2.2', parent:5},
		{_id: 11, title: 'Вложенный подпункт 2.2.2.1', parent:7},
		{_id: 6, title: 'Вложенный подпункт 2.2.1', parent:5},
		{_id: 8, title: 'Подпункт 2.3', parent:3},
		{_id: 1, title: 'Список'},
		{_id: 3, title: 'Второй пункт', parent:1},
		{_id: 9, title: 'Третий пункт', parent:1},
		{_id: 12, title: 'Пятый пункт', parent:1},
		{_id: 5, title: 'Подпункт 2.2', parent:3},
		{_id: 2, title: 'Первый пункт', parent:1},
		{_id: 221, title: 'Первый подпункт 1.1', parent:2},
		{_id: 4, title: 'Подпункт 2.1', parent:3},
	];
	
	for (let item of items) {
		await Items.create({
			id: item._id,
			title: item.title,
			parent: item.parent
		});
	}
	
	db.close();
});