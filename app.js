/* eslint-disable no-tabs */
const Express = require('express');
const fs = require('fs');

const app = new Express();
app.use(Express.json());
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tour-simple.json`));

app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'Success',
		length: tours.length - 1,
		data: {
			tours
		}
	});
});

app.get('/api/v1/tours/:id', (req, res) => {
	const { id } = req.params;
	const tour = tours.find(el => el.id === id * 1);
	if (!tour) {
		return res.status(404).json({
			status: 'fail',
			message: 'Not Found'
		});
	}
	res.status(200).json({
		status: 'Success',
		data: {
			tours
		}
	});
});

app.post('/api/v1/tours', (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	// eslint-disable-next-line prefer-object-spread
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/data/tour-simple.json`,
		JSON.stringify(tours),
		err => {
			res.status(201).json({ status: 'Success', data: { tours: newTour } });
		}
	);
});

app.patch('/api/v1/tours/:id', (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'failed',
			message: 'Invalid id'
		});
	}
	res.status(200).json({
		status: 'Sucess',
		data: {
			tours: '<Updated Tours here>'
		}
	});
});

app.delete('/api/v1/tours/:id', (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'failed',
			message: 'Invalid id'
		});
	}
	res.status(204).json({
		status: 'Sucess',
		data: null
	});
});

app.listen(3000);
