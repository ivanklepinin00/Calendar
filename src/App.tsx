import React from "react";
import { Calendar } from "./components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Roboto' sans-serif;
    font-size: 14px;
    background-color: #EFF5F5
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Calendar />
    </div>
  );
}

export default App;
