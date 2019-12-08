module.exports = (res, status, data, token) => {
  if (token)
    return res.status(status).json({ data, token });

  if (!token)
    return res.status(status).json({ data });
};
