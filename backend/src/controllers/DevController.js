const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },

  async update(request, response) {
    const { name, bio, avatar_url, techs, latitude, longitude } = request.body;

    const { github_username } = request.params;

    const dev = await Dev.findOne({ github_username });

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    await dev.update({
      name,
      bio,
      avatar_url,
      techs: techsArray,
      location
    });

    return response.json(request.body);
  },

  async destroy(request, response) {
    const { github_username } = request.params;

    await Dev.remove({ github_username });

    return response.json({});
  }
};
