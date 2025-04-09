const { check, validationResult } = require('express-validator');
const ErrorResponse = require('./errorResponse');

exports.validateBook = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be longer than 100 characters'),
  
  check('author')
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ max: 50 })
    .withMessage('Author name cannot be longer than 50 characters'),
    
  check('category')
    .notEmpty()
    .withMessage('Category is required'),
    
  check('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
    
  check('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
    
  check('publishedDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format. Use YYYY-MM-DD')
];

exports.validateUser = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
    
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return next(new ErrorResponse(errorMessages.join(', '), 400));
  }
  next();
};