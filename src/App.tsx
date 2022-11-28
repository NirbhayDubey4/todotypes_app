import React, { FC } from "react";
import Board from "./components/Board";

const App: FC<any> = () => {
  return (
    <div className="App">
      <div className="container mx-auto p-10 mt-5">
        <Board />
      </div>
    </div>
  );
};

export default App;
