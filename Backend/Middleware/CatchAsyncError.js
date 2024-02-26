module.exports = catchAsync => (req, resp, next) => {
    Promise.resolve(catchAsync(req, resp, next)).catch(next);
}