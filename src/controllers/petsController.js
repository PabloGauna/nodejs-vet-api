const pool = require('../db/pool');

async function listPets(req, res) {
  const { rows } = await pool.query(
    `SELECT pets.*, people.full_name AS owner_name
     FROM pets
     LEFT JOIN people ON pets.owner_id = people.id
     ORDER BY pets.id ASC`,
  );

  res.json(rows);
}

async function getPetById(req, res) {
  const id = Number(req.params.id);
  const { rows } = await pool.query(
    `SELECT pets.*, people.full_name AS owner_name
     FROM pets
     LEFT JOIN people ON pets.owner_id = people.id
     WHERE pets.id = $1`,
    [id],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  return res.json(rows[0]);
}

async function createPet(req, res) {
  const {
    name,
    species,
    breed,
    birth_date: birthDate,
    owner_id: ownerId,
  } = req.body;

  if (!name || !species) {
    return res.status(400).json({ error: 'name and species are required' });
  }

  const { rows } = await pool.query(
    `INSERT INTO pets (name, species, breed, birth_date, owner_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, species, breed || null, birthDate || null, ownerId || null],
  );

  return res.status(201).json(rows[0]);
}

async function updatePet(req, res) {
  const id = Number(req.params.id);
  const {
    name,
    species,
    breed,
    birth_date: birthDate,
    owner_id: ownerId,
  } = req.body;

  if (!name || !species) {
    return res.status(400).json({ error: 'name and species are required' });
  }

  const { rows } = await pool.query(
    `UPDATE pets
     SET name = $1,
         species = $2,
         breed = $3,
         birth_date = $4,
         owner_id = $5
     WHERE id = $6
     RETURNING *`,
    [name, species, breed || null, birthDate || null, ownerId || null, id],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  return res.json(rows[0]);
}

async function deletePet(req, res) {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query('DELETE FROM pets WHERE id = $1', [id]);

  if (rowCount === 0) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  return res.status(204).send();
}

module.exports = {
  listPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
