const {  check, validationResult } = require('express-validator');

exports.profileValidator = [
    check('name').not().isEmpty().trim().withMessage('All fields required'),
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('companyName').not().isEmpty().trim().withMessage('All fields required'),
    check('companyFbLink').not().isEmpty().trim().withMessage('All fields required'),
    check('address').not().isEmpty().trim().withMessage('All fields required'),
    
];

exports.profileValidatorResult = (req, res,next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError,
        });
    }

  next();  
};