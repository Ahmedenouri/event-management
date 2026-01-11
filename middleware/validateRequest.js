// Middleware pour valider les champs obligatoires
const validateRequest = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!req.body[field]) missingFields.push(field);
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Champs obligatoires manquants",
        missingFields,
      });
    }
    next();
  };
};

module.exports = validateRequest;
