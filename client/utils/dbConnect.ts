/* This is a database connection function*/
import mongoose from 'mongoose';

const connection = {} as any; /* creating connection object*/

async function dbConnect() {
	/* check if we have connection to our databse*/
	if (connection.isConnected) {
		return;
	}

	/* connecting to our database */
	const db = await mongoose.connect('mongodb://tickets-mongo-srv:27017/tickets', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});

	connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
