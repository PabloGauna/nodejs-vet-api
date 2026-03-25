const express = require('express');
const { getApiStatus } = require('../controllers/apiController');
const clientsRoutes = require('./clientsRoutes');
const petsRoutes = require('./petsRoutes');
const employeesRoutes = require('./employeesRoutes');

const router = express.Router();

router.get('/', getApiStatus);
router.use('/clients', clientsRoutes);
router.use('/pets', petsRoutes);
router.use('/employees', employeesRoutes);

module.exports = router;
