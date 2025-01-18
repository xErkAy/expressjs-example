export const errorHandler = async (err, req, res, next) => {
    if (!err.statusCode) {
        console.log('App error: ', err)
        res.status(500).json({
            'message': 'Something went wrong',
            'success': false,
        })
    } else {
        res.status(err.statusCode).json({
            'message': err.message ?? 'Something went wrong',
            'success': false,
        })
    }
}
