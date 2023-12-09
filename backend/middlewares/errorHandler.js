exports.serverError = (error, req, res, next) => {
	console.error('Error:', error.status, error.message);
	switch (error.status) {
		case 413:
			message = 'File size is too large. Please try again with a smaller file.';
			break;
		
		default:
			message = 'Internal server error';
			break;
	}
	res.status(500).json({
		success: false,
		code: 500,
		message,
        data: null
	});
};

exports.notFoundError = (req, res, next) => {
	console.error('Error:', error.status, req.originalUrl);
	res.status(404).json({
		success: false,
		code: 404,
		message: "There's nothing to looking for. Please try again later.",
        data: null
	});
};