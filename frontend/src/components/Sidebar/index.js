import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

import { Container, InputBlock, InputGroup } from "./styles";

export default function Sidebar({ devs, setDevs }) {
  const [github_username, setGithubusername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLongitude(latitude);
        setLatitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubusername("");
    setTechs("");
    setDevs([...devs, response.data]);
  }

  return (
    <Container>
      <strong>Cadastrar</strong>
      <form onSubmit={handleAddDev}>
        <InputBlock>
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            type="text"
            name="github_username"
            id="github_username"
            value={github_username}
            onChange={e => setGithubusername(e.target.value)}
          />
        </InputBlock>

        <InputBlock>
          <label htmlFor="tchs">Tecnologias</label>
          <input
            type="text"
            name="tchs"
            id="tchs"
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </InputBlock>

        <InputGroup>
          <InputBlock>
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </InputBlock>

          <InputBlock>
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </InputBlock>
        </InputGroup>

        <button type="submit">Salvar</button>
      </form>
    </Container>
  );
}

Sidebar.propTypes = {
  devs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDevs: PropTypes.func.isRequired
};
