const fs = require('fs');

const usersFile = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

exports.getUsers = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: usersFile.length,
		requestedTime: req.requestTime,
		data: usersFile
	})
};

exports.getUser = (req, res) => {
	const iduser = req.params.id;
	console.log(`Checking: ${iduser}`);
	const user = usersFile.find(el => el['_id'] === iduser);

	if(!user) {
		return res.status(404).json({
			status: 'failed',
			message: 'user not found'
		});
	}

	res.status(200).json({
		status: 'success',
		requestedTime: req.requestTime,
		data: user,
	})
};

//exports.createUser = (req, res) => {
//	const newId = usersFile.length;
//	const newuser = Object.assign({"id": newId}, req.body);

//	usersFile.push(newuser);

//	fs.writeFile(`${__dirname}/dev-data/data/users-simple.json`, JSON.stringify(usersFile), err => {
//		console.log(`New user: ${newuser}`);
//	})

//	res.status(201).json({
//		status: 'success',
//		requestedTime: req.requestTime,
//		data: newuser,
//	})
//};

exports.updateUser = (req, res) => {
	const iduser = req.params.id * 1;
	const user = usersFile.find(el => el.id === iduser);

	if(!user) {
		return res.status(404).json({
			status: 'failed',
			message: 'user not found'
		});
	}

	res.status(200).json({
		status: 'success',
		requestedTime: req.requestTime,
		data: '<Updated user>...',
	})
};

exports.deleteUser = (req, res) => {
	const iduser = req.params.id * 1;
	const user = usersFile.find(el => el.id === iduser);

	if(!user) {
		return res.status(404).json({
			status: 'failed',
			message: 'user not found'
		});
	}

	const newuserFiles = usersFile.filter(el => el.id != iduser);

	fs.writeFile(`${__dirname}/dev-data/data/users-simple.json`, JSON.stringify(newuserFiles), err => {
		console.log("Deleted...");
	})

	res.status(204).json({
		status: 'success',
	})
}