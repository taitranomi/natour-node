const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router.route('/top-5-cheapest').get(tourController.aliasingQuery, tourController.getTours);

router.route('/').get(tourController.getTours).post(tourController.createTour);

router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;