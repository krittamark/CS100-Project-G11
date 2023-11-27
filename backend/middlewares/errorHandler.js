exports.serverError = (error, req, res, next) => {
	console.error('Error:', error);
	res.status(500).json({
		success: false,
		code: 500,
		message: 'Internal server error',
        data: null
	});
};

exports.notFoundError = (req, res, next) => {
	res.status(404).json({
		success: false,
		code: 404,
		message: "There's nothing to looking for. Please try again later.",
        data: null
	});
};