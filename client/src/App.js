import "./App.css";

import React from "react";
import GameCanvas from "./components/GameCanvas";
import Turret from "./components/Turret";

function App() {
  return (
    <div>
      <GameCanvas />
      <Turret id="turret" />{" "}
      {/* You can add multiple turrets or manage them dynamically */}
    </div>
  );
}

export default App;
