const { Client } = require('../models');

async function listClients(req, res) {
  const clients = await Client.findAll({
    order: [['id', 'ASC']],
  });

  res.json(clients);
}

async function getClientById(req, res) {
  const id = Number(req.params.id);
  const client = await Client.findByPk(id);

  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  return res.json(client);
}

async function createClient(req, res) {
  const { full_name: fullName, phone, email } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: 'full_name is required' });
  }

  const client = await Client.create({
    full_name: fullName,
    phone: phone || null,
    email: email || null,
  });

  return res.status(201).json(client);
}

async function updateClient(req, res) {
  const id = Number(req.params.id);
  const { full_name: fullName, phone, email } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: 'full_name is required' });
  }

  const client = await Client.findByPk(id);

  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  await client.update({
    full_name: fullName,
    phone: phone || null,
    email: email || null,
  });

  return res.json(client);
}

async function deleteClient(req, res) {
  const id = Number(req.params.id);
  const client = await Client.findByPk(id);

  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  await client.destroy();

  return res.status(204).send();
}

module.exports = {
  listClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
