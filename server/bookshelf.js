const knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		port: '5432',
		user: 'root',
		database: 'yelpwrap'
	}
});

knex.schema.hasTable('users').then(exists => {
	if (!exists) {
		knex.schema.createTable('users', (table) => {
			table.increments('id').primary();
			table.string('username', 255).unique();
		}).then(table => {
			console.log('Created table:', table);
		}).catch(err => {
			console.error('Error:', err);
		})
	}
});

knex.schema.hasTable('favorites').then(exists => {
	if(!exists) {
		knex.schema.createTable('favorites', (table) => {
			table.increments('id').primary();
			table.integer('userId');
			table.string('url', 255);
			table.string('name', 255);
			table.string('phone', 16);
			table.string('address', 255);
		}).then(table => {
			console.log('Created table:', table);
		})
	}
})


const db = require('bookshelf')(knex);

module.exports = {db, knex};