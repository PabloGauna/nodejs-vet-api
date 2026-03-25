const { body, param } = require('express-validator');

const clientIdParamValidation = [
  param('id').isInt({ gt: 0 }).withMessage('id must be a positive integer'),
];

const clientBodyValidation = [
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('full_name is required'),
  body('phone')
    .optional({ values: 'null' })
    .isString()
    .withMessage('phone must be a string'),
  body('email')
    .optional({ values: 'null' })
    .isEmail()
    .withMessage('email must be a valid email'),
];

module.exports = {
  clientIdParamValidation,
  clientBodyValidation,
};
