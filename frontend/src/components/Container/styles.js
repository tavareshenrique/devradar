import styled from "styled-components";

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 30px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  main {
    margin-left: 30px;
  }

  @media (max-width: 1000px) {
    flex-direction: column;

    main {
      margin-left: 0;
      margin-top: 30px;
    }

    aside {
      width: 100%;
    }
  }
`;
