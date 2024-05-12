// // import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// }

// export default App;
import "./App.css";

// import { refreshState, saveState } from "./store/localStorage";

import React from "react";
import NetworkError from "./components/reusableComponents/NetworkError";
import Routes from "./routes";
import { ThemeProvider } from '@mui/material/styles';
// import configureStore from "./store/configureStore";
import theme from "./themes/materialTheme";

function App() {
  const [open, setOpen] = React.useState(false);

  function handleConnectionChange(event) {
    if (event.type === "offline") {
      setOpen(true)
    }
    if (event.type === "online") {
      window.location.reload();
      setOpen(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    }
  })

  return (

    <React.Fragment>
      <NetworkError open={open} setOpen={setOpen} />

      <Routes />

    </React.Fragment>
  );
}

export default App;
