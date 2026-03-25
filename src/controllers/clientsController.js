const pool = require('../db/pool');

async function listClients(req, res) {
  const { rows } = await pool.query('SELECT * FROM clients ORDER BY id ASC');
  res.json(rows);
}

async function getClientById(req, res) {
  const id = Number(req.params.id);
  const { rows } = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Client not found' });
  }

  return res.json(rows[0]);
}

async function createClient(req, res) {
  const { full_name: fullName, phone, email } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: 'full_name is required' });
  }

  const { rows } = await pool.query(
    `INSERT INTO clients (full_name, phone, email)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [fullName, phone || null, email || null],
  );

  return res.status(201).json(rows[0]);
}

async function updateClient(req, res) {
  const id = Number(req.params.id);
  const { full_name: fullName, phone, email } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: 'full_name is required' });
  }

  const { rows } = await pool.query(
    `UPDATE clients
     SET full_name = $1, phone = $2, email = $3
     WHERE id = $4
     RETURNING *`,
    [fullName, phone || null, email || null, id],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Client not found' });
  }

  return res.json(rows[0]);
}

async function deleteClient(req, res) {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query('DELETE FROM clients WHERE id = $1', [id]);

  if (rowCount === 0) {
    return res.status(404).json({ error: 'Client not found' });
  }

  return res.status(204).send();
}

module.exports = {
  listClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
