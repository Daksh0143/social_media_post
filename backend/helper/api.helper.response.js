const successResponse = ({ res, statusCode = 200, message, data }) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
    
  });
};

const failureResponse = ({ res, statusCode = 500, message }) => {
  // console.log("Response,",res)
  // console.log("StatusCode", statusCode);
  res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
};

module.exports = { successResponse, failureResponse };
