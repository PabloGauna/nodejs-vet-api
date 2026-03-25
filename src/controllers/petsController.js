const { Client, Pet, PetMedication, PetVaccine } = require('../models');

function serializePet(pet) {
  const petData = pet.toJSON();

  return {
    ...petData,
    client_name: petData.client ? petData.client.full_name : null,
  };
}

async function findPetOrRespond(res, petId, include = []) {
  const pet = await Pet.findByPk(petId, { include });

  if (!pet) {
    res.status(404).json({ error: 'Pet not found' });
    return null;
  }

  return pet;
}

async function listPets(req, res) {
  const pets = await Pet.findAll({
    include: [
      {
        model: Client,
        as: 'client',
        attributes: ['id', 'full_name'],
        required: false,
      },
      {
        model: PetVaccine,
        as: 'vaccines',
      },
      {
        model: PetMedication,
        as: 'medications',
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
        as: 'client',
        attributes: ['id', 'full_name'],
        required: false,
      },
      {
        model: PetVaccine,
        as: 'vaccines',
      },
      {
        model: PetMedication,
        as: 'medications',
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
    client_id: clientId,
  } = req.body;

  const pet = await Pet.create({
    name,
    species,
    breed: breed || null,
    birth_date: birthDate || null,
    client_id: clientId || null,
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
    client_id: clientId,
  } = req.body;

  const pet = await Pet.findByPk(id);

  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  await pet.update({
    name,
    species,
    breed: breed || null,
    birth_date: birthDate || null,
    client_id: clientId || null,
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

async function listPetVaccines(req, res) {
  const petId = Number(req.params.id);
  const pet = await findPetOrRespond(res, petId);

  if (!pet) {
    return;
  }

  const vaccines = await PetVaccine.findAll({
    where: { pet_id: petId },
    order: [['application_date', 'DESC']],
  });

  res.json(vaccines);
}

async function createPetVaccine(req, res) {
  const petId = Number(req.params.id);
  const pet = await findPetOrRespond(res, petId);

  if (!pet) {
    return;
  }

  const {
    name,
    application_date: applicationDate,
    next_due_date: nextDueDate,
    notes,
  } = req.body;

  const vaccine = await PetVaccine.create({
    pet_id: petId,
    name,
    application_date: applicationDate,
    next_due_date: nextDueDate || null,
    notes: notes || null,
  });

  return res.status(201).json(vaccine);
}

async function updatePetVaccine(req, res) {
  const petId = Number(req.params.id);
  const vaccineId = Number(req.params.vaccineId);

  const vaccine = await PetVaccine.findOne({
    where: { id: vaccineId, pet_id: petId },
  });

  const {
    name,
    application_date: applicationDate,
    next_due_date: nextDueDate,
    notes,
  } = req.body;

  await vaccine.update({
    name,
    application_date: applicationDate,
    next_due_date: nextDueDate || null,
    notes: notes || null,
  });

  return res.json(vaccine);
}

async function deletePetVaccine(req, res) {
  const petId = Number(req.params.id);
  const vaccineId = Number(req.params.vaccineId);

  const vaccine = await PetVaccine.findOne({
    where: { id: vaccineId, pet_id: petId },
  });

  await vaccine.destroy();

  return res.status(204).send();
}

async function listPetMedications(req, res) {
  const petId = Number(req.params.id);
  const pet = await findPetOrRespond(res, petId);

  if (!pet) {
    return;
  }

  const medications = await PetMedication.findAll({
    where: { pet_id: petId },
    order: [['start_date', 'DESC']],
  });

  res.json(medications);
}

async function createPetMedication(req, res) {
  const petId = Number(req.params.id);
  const pet = await findPetOrRespond(res, petId);

  if (!pet) {
    return;
  }

  const {
    name,
    dosage,
    start_date: startDate,
    end_date: endDate,
    notes,
  } = req.body;

  const medication = await PetMedication.create({
    pet_id: petId,
    name,
    dosage: dosage || null,
    start_date: startDate,
    end_date: endDate || null,
    notes: notes || null,
  });

  return res.status(201).json(medication);
}

async function updatePetMedication(req, res) {
  const petId = Number(req.params.id);
  const medicationId = Number(req.params.medicationId);

  const medication = await PetMedication.findOne({
    where: { id: medicationId, pet_id: petId },
  });

  const {
    name,
    dosage,
    start_date: startDate,
    end_date: endDate,
    notes,
  } = req.body;

  await medication.update({
    name,
    dosage: dosage || null,
    start_date: startDate,
    end_date: endDate || null,
    notes: notes || null,
  });

  return res.json(medication);
}

async function deletePetMedication(req, res) {
  const petId = Number(req.params.id);
  const medicationId = Number(req.params.medicationId);

  const medication = await PetMedication.findOne({
    where: { id: medicationId, pet_id: petId },
  });

  await medication.destroy();

  return res.status(204).send();
}

module.exports = {
  listPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  listPetVaccines,
  createPetVaccine,
  updatePetVaccine,
  deletePetVaccine,
  listPetMedications,
  createPetMedication,
  updatePetMedication,
  deletePetMedication,
};
