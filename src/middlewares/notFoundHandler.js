const notFound = (req, res) => {
    res.error(404, `Cannot ${req.method} ${req.url}`, "Resource not found");
}

module.exports = notFound;