const {  check, validationResult } = require('express-validator');


exports.deliveryValidator = (
       check('phone').isMobilePhone("bn-BD").withMessage('Invalid Phone Number'),
        check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  );

  exports.deliveryvalidatorResult = (req, res, next) => {
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
