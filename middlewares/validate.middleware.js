export const validate = (schema) => (req, res, next) => {
  try {
    if (schema.body) {
      const parsed = schema.body.parse(req.body);
      req.validatedBody = parsed; // ✅ use a new property
    }

    if (schema.params) {
      const parsed = schema.params.parse(req.params);
      req.validatedParams = parsed; // ✅ use new property
    }

    if (schema.query) {
      const parsed = schema.query.parse(req.query);
      req.validatedQuery = parsed; // ✅ use new property
    }

    next();
  } catch (err) {
    const issues =
      err?.errors?.map((e) => ({
        path: e.path,
        message: e.message,
      })) || [{ message: err.message }];

    return res.status(400).json({
      message: "Validation error",
      issues,
    });
  }
};
