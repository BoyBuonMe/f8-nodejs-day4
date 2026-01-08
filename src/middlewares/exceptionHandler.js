const errorException = (err, _, res, next) => {
    res.json(500, err.message, err);
}

module.exports = errorException;