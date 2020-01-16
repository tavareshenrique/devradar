import { createGlobalStyle } from "styled-components";

import "react-toastify/dist/ReactToastify.css";

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: #E5E6F0;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: Roboto, sans-serif;
  }
`;

export default GlobalStyle;
