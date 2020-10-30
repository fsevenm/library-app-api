const userRepository = (network) => {
  return {
    getInfo: (username) => network.get(`/user/${username}`),
  };
};

module.exports = userRepository;
