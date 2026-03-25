const pool = require('../db/pool');

async function listEmployees(req, res) {
  const { rows } = await pool.query('SELECT * FROM employees ORDER BY id ASC');
  res.json(rows);
}

async function getEmployeeById(req, res) {
  const id = Number(req.params.id);
  const { rows } = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  return res.json(rows[0]);
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

  const { rows } = await pool.query(
    `INSERT INTO employees (full_name, role, phone, email, hire_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [fullName, role, phone || null, email || null, hireDate || null],
  );

  return res.status(201).json(rows[0]);
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

  const { rows } = await pool.query(
    `UPDATE employees
     SET full_name = $1,
         role = $2,
         phone = $3,
         email = $4,
         hire_date = $5
     WHERE id = $6
     RETURNING *`,
    [fullName, role, phone || null, email || null, hireDate || null, id],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  return res.json(rows[0]);
}

async function deleteEmployee(req, res) {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query('DELETE FROM employees WHERE id = $1', [id]);

  if (rowCount === 0) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  return res.status(204).send();
}

module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
