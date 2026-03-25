const { Client, Pet } = require('../models');

function serializePet(pet) {
  const petData = pet.toJSON();

  return {
    ...petData,
    owner_name: petData.owner ? petData.owner.full_name : null,
  };
}

async function listPets(req, res) {
  const pets = await Pet.findAll({
    include: [
      {
        model: Client,
        as: 'owner',
        attributes: ['id', 'full_name'],
        required: false,
      },
    ],
    order: [['id', 'ASC']],
  });

  res.json(pets.map(serializePet));
}

async function getPetById(req, res) {
  const id = Number(req.params.id);
  const pet = await Pet.findByPk(id, {
    include: [
      {
        model: Client,
        as: 'owner',
        attributes: ['id', 'full_name'],
        required: false,
      },
    ],
  });

  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  return res.json(serializePet(pet));
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

  const pet = await Pet.create({
    name,
    species,
    breed: breed || null,
    birth_date: birthDate || null,
    owner_id: ownerId || null,
  });

  return res.status(201).json(pet);
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

  const pet = await Pet.findByPk(id);

  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  await pet.update({
    name,
    species,
    breed: breed || null,
    birth_date: birthDate || null,
    owner_id: ownerId || null,
  });

  return res.json(pet);
}

async function deletePet(req, res) {
  const id = Number(req.params.id);
  const pet = await Pet.findByPk(id);

  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  await pet.destroy();

  return res.status(204).send();
}

module.exports = {
  listPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
