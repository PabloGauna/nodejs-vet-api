const express = require('express');
const {
  listPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} = require('../controllers/petsController');

const router = express.Router();

router.get('/', listPets);
router.get('/:id', getPetById);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;
