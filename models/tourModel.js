const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Tour must have a name'],
		unique: true
	},
	rating: {
		type: Number,
		default: 4.0
	},
	price: {
		type: Number,
		required: [true, 'Tour must have price']
	},
	descriptions: {
		type: String,
		required: [true, 'Tour must have a description']
	},
	maxGroupSize: {
		type: Number,
		required: [true, 'Tour must have the max Group Size']
	}
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;