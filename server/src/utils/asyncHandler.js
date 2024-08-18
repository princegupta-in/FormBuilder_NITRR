const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = () => {()=>}

// const asyncHandler = (fn) => async () => {
//   try {
//     await fn(res, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

//asyncHandler hum log isliye use kr rhe h taki hum bar bar try catch na krna pade hm directly try block k andar ka code likhe
