import { useState } from "react";
import "./App.css";

import Encabezado from "./components/Encabezado";
import Inicio from "./components/Inicio";
import Menu from "./components/Menu";
import Nosotros from "./components/Nosotros";
import Reservas from "./components/Reservas";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const esReservas = window.location.pathname === "/reservas";

  return (
    <div>
      <Encabezado
        usuarioActivo={usuarioActivo}
        setUsuarioActivo={setUsuarioActivo}
        mostrarLogin={mostrarLogin}
        setMostrarLogin={setMostrarLogin}
      />

      {esReservas ? (
        <Reservas
          usuarioActivo={usuarioActivo}
          abrirLogin={() => setMostrarLogin(true)}
        />
      ) : (
        <>
          <Inicio />
          <Menu />
          <Nosotros />
          <Blog />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;