const express = require('express');
const validateRequest = require('../middleware/validateRequest');
const {
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
} = require('../controllers/petsController');
const {
  petIdParamValidation,
  vaccineIdParamValidation,
  medicationIdParamValidation,
  petBodyValidation,
  vaccineBodyValidation,
  medicationBodyValidation,
  petExistsForRoute,
  vaccineExistsForRoute,
  medicationExistsForRoute,
} = require('../validators/petValidators');

const router = express.Router();

router.get('/', listPets);
router.get('/:id', petIdParamValidation, validateRequest, getPetById);
router.get('/:id/vaccines', petIdParamValidation, validateRequest, petExistsForRoute, listPetVaccines);
router.post('/:id/vaccines', petIdParamValidation, vaccineBodyValidation, validateRequest, petExistsForRoute, createPetVaccine);
router.put('/:id/vaccines/:vaccineId', petIdParamValidation, vaccineIdParamValidation, vaccineBodyValidation, validateRequest, petExistsForRoute, vaccineExistsForRoute, updatePetVaccine);
router.delete('/:id/vaccines/:vaccineId', petIdParamValidation, vaccineIdParamValidation, validateRequest, petExistsForRoute, vaccineExistsForRoute, deletePetVaccine);
router.get('/:id/medications', petIdParamValidation, validateRequest, petExistsForRoute, listPetMedications);
router.post('/:id/medications', petIdParamValidation, medicationBodyValidation, validateRequest, petExistsForRoute, createPetMedication);
router.put('/:id/medications/:medicationId', petIdParamValidation, medicationIdParamValidation, medicationBodyValidation, validateRequest, petExistsForRoute, medicationExistsForRoute, updatePetMedication);
router.delete('/:id/medications/:medicationId', petIdParamValidation, medicationIdParamValidation, validateRequest, petExistsForRoute, medicationExistsForRoute, deletePetMedication);
router.post('/', petBodyValidation, validateRequest, createPet);
router.put('/:id', petIdParamValidation, petBodyValidation, validateRequest, updatePet);
router.delete('/:id', petIdParamValidation, validateRequest, deletePet);

module.exports = router;
