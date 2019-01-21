const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((error, connection) => {

	if (error) {
		
		switch (error.code) {

			case 'PROTOCOL_CONNECTION_LOST':
				console.error('DATABASE CONNECTION WAS CLOSED');
				break;
			
			case 'ER_CON_COUNT_ERROR':
				console.error('DATABASE HAS TOO MANY CONNECTIONS');
				break;
			
			case 'ECONNREFUSED':
				console.error('DATABASE CONNECTION WAS REFUSED');
				break;
			
		} 

	} else if (connection) {
		connection.release();
		console.log('DB is connected');
		return;
	}

});

// --- Promisify pool querys.
// --- Enabling promises and async - await syntax to mysql module

pool.query = promisify(pool.query);

module.exports = pool;
