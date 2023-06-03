"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoError = exports.insufficientParameters = exports.failureResponse = exports.successResponse = exports.ResponseStatusCode = void 0;
var ResponseStatusCode;
(function (ResponseStatusCode) {
    ResponseStatusCode[ResponseStatusCode["success"] = 200] = "success";
    ResponseStatusCode[ResponseStatusCode["bad_request"] = 400] = "bad_request";
    ResponseStatusCode[ResponseStatusCode["internal_server_error"] = 500] = "internal_server_error";
})(ResponseStatusCode || (exports.ResponseStatusCode = ResponseStatusCode = {}));
function successResponse(message, DATA, res) {
    res.status(ResponseStatusCode.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    });
}
exports.successResponse = successResponse;
function failureResponse(message, DATA, res) {
    res.status(ResponseStatusCode.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    });
}
exports.failureResponse = failureResponse;
function insufficientParameters(res) {
    res.status(ResponseStatusCode.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}
exports.insufficientParameters = insufficientParameters;
function mongoError(err, res) {
    res.status(ResponseStatusCode.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}
exports.mongoError = mongoError;
