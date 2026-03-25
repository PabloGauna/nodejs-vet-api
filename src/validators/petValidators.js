const { body, param } = require('express-validator');
const { Client, Pet, PetMedication, PetVaccine } = require('../models');

const petIdParamValidation = [
  param('id').isInt({ gt: 0 }).withMessage('id must be a positive integer'),
];

const vaccineIdParamValidation = [
  param('vaccineId').isInt({ gt: 0 }).withMessage('vaccineId must be a positive integer'),
];

const medicationIdParamValidation = [
  param('medicationId').isInt({ gt: 0 }).withMessage('medicationId must be a positive integer'),
];

const petBodyValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required'),
  body('species')
    .trim()
    .notEmpty()
    .withMessage('species is required'),
  body('breed')
    .optional({ values: 'null' })
    .isString()
    .withMessage('breed must be a string'),
  body('birth_date')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('birth_date must be a valid date'),
  body('client_id')
    .optional({ values: 'null' })
    .isInt({ gt: 0 })
    .withMessage('client_id must be a positive integer')
    .bail()
    .custom(async (value) => {
      if (value === undefined || value === null) {
        return true;
      }

      const client = await Client.findByPk(value);

      if (!client) {
        throw new Error('client_id must reference an existing client');
      }

      return true;
    }),
];

const vaccineBodyValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required'),
  body('application_date')
    .isISO8601()
    .withMessage('application_date must be a valid date'),
  body('next_due_date')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('next_due_date must be a valid date'),
  body('notes')
    .optional({ values: 'null' })
    .isString()
    .withMessage('notes must be a string'),
];

const medicationBodyValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required'),
  body('dosage')
    .optional({ values: 'null' })
    .isString()
    .withMessage('dosage must be a string'),
  body('start_date')
    .isISO8601()
    .withMessage('start_date must be a valid date'),
  body('end_date')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('end_date must be a valid date'),
  body('notes')
    .optional({ values: 'null' })
    .isString()
    .withMessage('notes must be a string'),
];

async function petExistsForRoute(req, res, next) {
  const pet = await Pet.findByPk(Number(req.params.id));

  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  return next();
}

async function vaccineExistsForRoute(req, res, next) {
  const vaccine = await PetVaccine.findOne({
    where: {
      id: Number(req.params.vaccineId),
      pet_id: Number(req.params.id),
    },
  });

  if (!vaccine) {
    return res.status(404).json({ error: 'Vaccine not found' });
  }

  return next();
}

async function medicationExistsForRoute(req, res, next) {
  const medication = await PetMedication.findOne({
    where: {
      id: Number(req.params.medicationId),
      pet_id: Number(req.params.id),
    },
  });

  if (!medication) {
    return res.status(404).json({ error: 'Medication not found' });
  }

  return next();
}

module.exports = {
  petIdParamValidation,
  vaccineIdParamValidation,
  medicationIdParamValidation,
  petBodyValidation,
  vaccineBodyValidation,
  medicationBodyValidation,
  petExistsForRoute,
  vaccineExistsForRoute,
  medicationExistsForRoute,
};
