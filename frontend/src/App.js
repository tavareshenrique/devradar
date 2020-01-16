import React, { useEffect, useState } from "react";
import api from "./services/api";

import Container from "./components/Container";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

import GlobalStyle from "./styles";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar devs={devs} setDevs={setDevs} />
        <Main devs={devs} />
      </Container>
    </>
  );
}

export default App;
