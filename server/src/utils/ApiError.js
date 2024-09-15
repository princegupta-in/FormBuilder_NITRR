// class ApiError extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong..", //iss message ki log generally bhut burai krte h kyuki ye kuch v nhi krta
//     errors = [], //multiple errors yha pe hum dalenge
//     stack = ""
//   ) {
//     //ab yha hum message ko override krenge
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.message = message;
//     this.success = false;
//     this.errors = errors;
//     if (stack) {
//       //stacktrace ka use hum production level me islye krte h taki jha jha jis stacktrace me dikkat aye wo hume mil jaye
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export { ApiError };

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports =  ApiError ;
