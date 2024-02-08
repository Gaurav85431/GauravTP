const validate = (schema) => async (req, res, next) => {
  // 2 arrow function
  // schema wo hai jo hki hmne auth-validator me signupSchmea banaya hia.
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    // res.status(400).json(error);

    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = error.errors[0].message;

    const errors = {
      status, message, extraDetails
    }
    console.log(errors);

    next(errors);
  }
}

module.exports = validate;