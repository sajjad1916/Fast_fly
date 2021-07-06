const {  check, validationResult } = require('express-validator');


exports.signupValidator = (
       check('phone').isMobilePhone("bn-BD").withMessage('Invalid Phone Number')
  );



exports.signinValidator = [
    check('phone').isMobilePhone("bn-BD").withMessage('Invalid Phone Number')
];

exports.validatorResult = (req, res, next) => {
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
