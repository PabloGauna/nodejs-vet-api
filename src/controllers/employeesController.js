const { Employee } = require('../models');

async function listEmployees(req, res) {
  const employees = await Employee.findAll({
    order: [['id', 'ASC']],
  });

  res.json(employees);
}

async function getEmployeeById(req, res) {
  const id = Number(req.params.id);
  const employee = await Employee.findByPk(id);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  return res.json(employee);
}

async function createEmployee(req, res) {
  const {
    full_name: fullName,
    role,
    phone,
    email,
    hire_date: hireDate,
  } = req.body;

  if (!fullName || !role) {
    return res.status(400).json({ error: 'full_name and role are required' });
  }

  const employee = await Employee.create({
    full_name: fullName,
    role,
    phone: phone || null,
    email: email || null,
    hire_date: hireDate || null,
  });

  return res.status(201).json(employee);
}

async function updateEmployee(req, res) {
  const id = Number(req.params.id);
  const {
    full_name: fullName,
    role,
    phone,
    email,
    hire_date: hireDate,
  } = req.body;

  if (!fullName || !role) {
    return res.status(400).json({ error: 'full_name and role are required' });
  }

  const employee = await Employee.findByPk(id);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  await employee.update({
    full_name: fullName,
    role,
    phone: phone || null,
    email: email || null,
    hire_date: hireDate || null,
  });

  return res.json(employee);
}

async function deleteEmployee(req, res) {
  const id = Number(req.params.id);
  const employee = await Employee.findByPk(id);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  await employee.destroy();

  return res.status(204).send();
}

module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
