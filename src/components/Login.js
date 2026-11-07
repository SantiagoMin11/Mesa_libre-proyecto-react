
import { useState } from "react";
import "./Login.css";

function Login({
  usuarioActivo,
  setUsuarioActivo,
  mostrarLogin,
  setMostrarLogin
}) {
  const [modo, setModo] = useState("registro");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cuentas, setCuentas] = useState([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [correoLogin, setCorreoLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  function cambiarModo(nuevoModo) {
    setModo(nuevoModo);
    setMensaje("");
    setMostrarPassword(false);
  }

  function cerrarModal() {
    setMostrarLogin(false);
    setMensaje("");
  }

  function registrar(e) {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !dni.trim() ||
      !correo.trim() ||
      !contrasena
    ) {
      setTipoMensaje("error");
      setMensaje("Completa todos los campos.");
      return;
    }

    if (!/^\d{8}$/.test(dni)) {
      setTipoMensaje("error");
      setMensaje("El DNI debe tener 8 dígitos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setTipoMensaje("error");
      setMensaje("Ingresa un correo válido.");
      return;
    }

    if (contrasena.length < 6) {
      setTipoMensaje("error");
      setMensaje("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    const existe = cuentas.some(
      (cuenta) =>
        cuenta.correo.toLowerCase() === correo.trim().toLowerCase()
    );

    if (existe) {
      setTipoMensaje("error");
      setMensaje("Este correo ya está registrado.");
      return;
    }

    const nuevaCuenta = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      correo: correo.trim(),
      contrasena: contrasena
    };

    setCuentas([...cuentas, nuevaCuenta]);

    setCorreoLogin(correo.trim());
    setPasswordLogin("");

    setNombre("");
    setApellido("");
    setDni("");
    setCorreo("");
    setContrasena("");

    cambiarModo("login");
    setTipoMensaje("exito");
    setMensaje("¡Cuenta creada! Ahora puedes iniciar sesión.");
  }

  function iniciarSesion(e) {
    e.preventDefault();

    const cuentaEncontrada = cuentas.find(
      (cuenta) =>
        cuenta.correo.toLowerCase() === correoLogin.trim().toLowerCase()
    );

    if (
      !cuentaEncontrada ||
      cuentaEncontrada.contrasena !== passwordLogin
    ) {
      setTipoMensaje("error");
      setMensaje("Correo o contraseña incorrectos.");
      return;
    }

    setUsuarioActivo(cuentaEncontrada.nombre);
    setTipoMensaje("exito");
    setMensaje("¡Bienvenido, " + cuentaEncontrada.nombre + "!");

    setTimeout(() => {
      cerrarModal();
    }, 1200);
  }

  function cerrarSesion() {
    setUsuarioActivo(null);
    setMensaje("");
    setCorreoLogin("");
    setPasswordLogin("");
  }

  return (
    <>
      <button
        className="boton-usuario"
        type="button"
        onClick={() => {
          if (usuarioActivo) {
            cerrarSesion();
          } else {
            setMostrarLogin(true);
          }
        }}
      >
        <span>♙</span>
        <span>
          {usuarioActivo
            ? "Cerrar sesión (" + usuarioActivo + ")"
            : "Iniciar sesión"}
        </span>
      </button>

      {mostrarLogin && (
        <div className="overlay" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="x"
              type="button"
              onClick={cerrarModal}
            >
              ×
            </button>

            <h2>Bienvenido a <b>MESA LIBRE</b>!</h2>

            <div className="tabs">
              <button
                type="button"
                className={modo === "registro" ? "tab-activa" : ""}
                onClick={() => cambiarModo("registro")}
              >
                Registrarse
              </button>

              <button
                type="button"
                className={modo === "login" ? "tab-activa" : ""}
                onClick={() => cambiarModo("login")}
              >
                Iniciar sesión
              </button>
            </div>

            {mensaje && (
              <p className={"mensaje " + tipoMensaje}>
                {mensaje}
              </p>
            )}

            {modo === "registro" ? (
              <form onSubmit={registrar}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Nombres"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <input
                    type="text"
                    placeholder="Apellidos"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <input
                    type="text"
                    placeholder="N° DNI"
                    maxLength="8"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className="field campo-password">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />

                  <button
                    className="eye"
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  >
                    {mostrarPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>

                <button className="submit" type="submit">
                  Crear cuenta
                </button>
              </form>
            ) : (
              <form onSubmit={iniciarSesion}>
                <div className="field">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={correoLogin}
                    onChange={(e) => setCorreoLogin(e.target.value)}
                    required
                  />
                </div>

                <div className="field campo-password">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    required
                  />

                  <button
                    className="eye"
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  >
                    {mostrarPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>

                <button className="submit" type="submit">
                  Iniciar sesión
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
