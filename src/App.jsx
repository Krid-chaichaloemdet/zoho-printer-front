import LoadingPage from "../component/LoadingPage";
import Route from "./router/Route";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return <div className="flex">{loading ? <LoadingPage /> : <Route />}</div>;
}

export default App;
