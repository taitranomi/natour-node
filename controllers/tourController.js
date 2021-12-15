const Tour = require('./../models/tourModel');

exports.aliasingQuery = (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = 'createdAt,price';
	next();
}

exports.getTours = async (req, res) => {
	try {
		// FILTERING
		const queryObj = {...req.query};
		const excludedObj = ['page', 'limit', 'sort', 'fields'];
		excludedObj.forEach(el => delete queryObj[el]);

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

		let query = Tour.find(JSON.parse(queryStr));
		
		// SORTING
		if(req.params.sort) {
			const sb = req.query.sort.split(',').join(' ');
			query = query.sortBy(sb);
		} else {
			query = query.sortBy('-createdAt');
		}

		// FIELDS LIMITING
		if(req.params.fields) {
			const fieldsSelected = req.query.fields.split(',').join(' ');
			query = query.select(fieldsSelected);
		} else {
			query = query.select('-__v');
		}

		// PAGINATION
		const pageQuery = req.query.page * 1 || 1;
		const limitQuery = req.query.limit * 1 || 100;
		const skipQuery = (pageQuery - 1) * limitQuery;

		query = query.skip(skipQuery).limit(limitQuery);

		if(req.query.page) {
			const numTours = await Tour.countDocuments();
			if(skipQuery >= numTours) throw new Error('This page does not exit');
		}

		const tours = await query;

		res.status(200).json({
			status: 'success',
			results: tours
		})
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err
		})
	}
};

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: tour
		})
	} catch(err) {
		res.status(404).json({
			status: 'failed',
			message: err
		})
	}
};

exports.createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);

		res.status(201).json({
			status: 'success',
			data: newTour
		})
	} catch(err) {
		res.status(404).json({
			status: 'failed',
			message: err
		})
	}

};

exports.updateTour = async (req, res) => {
	try {
		const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(200).json({
			status: 'success',
			data: updatedTour
		})
	} catch(err) {
		res.status(404).json({
			status: 'failed',
			message: err
		})
	}
	
};

exports.deleteTour = async (req, res) => {
	try {
		const oldTour = await Tour.findByIdAndDelete(req.params.id)

		console.log(`Old Record: ${oldTour}`);

		res.status(204).json({
			status: 'success'
		})
	} catch(err) {
		res.status(404).json({
			status: 'failed',
			message: err
		})
	}
}