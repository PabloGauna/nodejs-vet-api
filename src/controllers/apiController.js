function getApiStatus(req, res) {
  res.json({ message: 'Veterinary clinic API is running' });
}

module.exports = {
  getApiStatus,
};
