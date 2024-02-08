const errorMiddleware = (err, req, res, next) => {

  const status = err.status || 500; // Any error code or default 500
  const message = err.message || "BACKEND ERROR";//if any err msg come then wo otherwise defualt error message i.e. BACKEND ERROR
  const extraDetails = err.extraDetails || "Error from Backend";

  return res.status(status).json({ message, extraDetails });

};

module.exports = errorMiddleware;