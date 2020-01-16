import React from "react";
import PropTypes from "prop-types";

import deleteImg from "../../assets/images/delete.svg";

import { Container, DevItem, DeleteContainer, UserInfo } from "./styles";

export default function Main({ devs, handleDeleteDev }) {
  return (
    <Container>
      <ul>
        {devs.map(dev => (
          <DevItem key={dev._id}>
            <DeleteContainer
              onClick={() => handleDeleteDev(dev.github_username)}
            >
              <img src={deleteImg} alt="Deletar Dev" />
            </DeleteContainer>

            <header>
              <img src={dev.avatar_url} alt={dev.name} />
              <UserInfo className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(", ")}</span>
              </UserInfo>
            </header>
            <p>{dev.bio}</p>
            <a
              href={`https://github.com/${dev.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar perfil no Github
            </a>
          </DevItem>
        ))}
      </ul>
    </Container>
  );
}

Main.propTypes = {
  devs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      avatar_url: PropTypes.string,
      name: PropTypes.string,
      bio: PropTypes.string,
      techs: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  handleDeleteDev: PropTypes.func.isRequired
};
