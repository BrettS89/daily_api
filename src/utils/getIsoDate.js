module.exports = () => {
  return new Date().toISOString().split('T')[0];
};
