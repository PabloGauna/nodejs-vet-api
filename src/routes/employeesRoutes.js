const express = require('express');
const validateRequest = require('../middleware/validateRequest');
const {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeesController');
const {
  employeeIdParamValidation,
  employeeBodyValidation,
} = require('../validators/employeeValidators');

const router = express.Router();

router.get('/', listEmployees);
router.get('/:id', employeeIdParamValidation, validateRequest, getEmployeeById);
router.post('/', employeeBodyValidation, validateRequest, createEmployee);
router.put('/:id', employeeIdParamValidation, employeeBodyValidation, validateRequest, updateEmployee);
router.delete('/:id', employeeIdParamValidation, validateRequest, deleteEmployee);

module.exports = router;
