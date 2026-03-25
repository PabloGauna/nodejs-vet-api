const express = require('express');
const {
  listPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/peopleController');

const router = express.Router();

router.get('/', listPeople);
router.get('/:id', getPersonById);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;
