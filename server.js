const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATABASE.replace('<DATABASEPW>', process.env.PASSWORD);
mongoose.connect(DB).then(() => console.log('Connected to the db!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on...${port}`)
});