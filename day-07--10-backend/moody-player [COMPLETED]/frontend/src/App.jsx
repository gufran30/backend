import { useState } from "react";
import FacialExpression from "./components/FacialExpression";
import MoodSongs from "./components/MoodSongs";

const App = () => {
  const [Songs, setSongs] = useState([]);

  return (
    <main>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
    </main>
  );
};

export default App;
