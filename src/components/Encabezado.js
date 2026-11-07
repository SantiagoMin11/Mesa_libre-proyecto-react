import "./Encabezado.css";
import Login from "./Login";

function Encabezado({
  usuarioActivo,
  setUsuarioActivo,
  mostrarLogin,
  setMostrarLogin
}) {
  return (
    <header className="encabezado">
      <div className="contenedor-logo">
        <h2>Mesa Libre</h2>
      </div>

      <nav className="navegacion">
        <a href="/">Inicio</a>
        <a href="/#menu">Menú</a>
        <a href="/#nosotros">Nosotros</a>
        <a href="/reservas">Reservas</a>
        <a href="/#blog">Blog</a>
      </nav>

      <div className="usuario">
        <Login
          usuarioActivo={usuarioActivo}
          setUsuarioActivo={setUsuarioActivo}
          mostrarLogin={mostrarLogin}
          setMostrarLogin={setMostrarLogin}
        />
      </div>
    </header>
  );
}

export default Encabezado;