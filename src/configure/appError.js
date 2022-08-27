/**
 * Give a consistent error object
 * @constructor
 * @constructs Error
 * @param {string|number} commonType
 * @param {*} description
 * @param {boolean} [isOperational]
 */
function AppError({ code, message, isOperational }) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.commonType = code;
  this.description = message;
  this.message = message;
  this.isOperational = isOperational;
}

AppError.getMessage = function getMessage(err) {
  const message = err.details ? err.details[0] : err.message;
  return message;
};

export default AppError;
