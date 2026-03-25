const express = require('express');
const { getApiStatus } = require('../controllers/apiController');
const peopleRoutes = require('./peopleRoutes');
const petsRoutes = require('./petsRoutes');
const employeesRoutes = require('./employeesRoutes');

const router = express.Router();

router.get('/', getApiStatus);
router.use('/people', peopleRoutes);
router.use('/pets', petsRoutes);
router.use('/employees', employeesRoutes);

module.exports = router;
