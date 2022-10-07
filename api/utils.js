const { adminCheckById } = require("../db");

const requireUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({
      error: "401",
      name: "UnauthorizedError",
      message: "Please login to perform this action.",
    });
  }

  next();
};

const requireAdmin = async (req, res, next) => {
  if (!req.user) {
    res.status(401).send({
      error: "401",
      name: "UnauthorizedError",
      message: "Please login to perform this action.",
    });
  }

  try {
    const admin = await adminCheckById(req.user.id);
    if (!admin) {
      res.send({
        error: "Not Admin",
        name: "Not Admin",
        message: "You aren't the admin",
      });
    }
    next();
  } catch ({ error, message }) {
    next({ error, message });
  }
};
module.exports = {
  requireUser,
  requireAdmin,
};
