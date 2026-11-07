import { useState } from "react";
import "./Reservas.css";

function Reservas({ usuarioActivo, abrirLogin }) {
  const [fecha, setFecha] = useState("");
  const [personas, setPersonas] = useState(2);
  const [zona, setZona] = useState("salon");
  const [hora, setHora] = useState("");
  const [confirmada, setConfirmada] = useState(false);
  const [mesActual, setMesActual] = useState(new Date());

  const zonas = [
    { id: "salon", nombre: "Salón principal", descripcion: "Un ambiente cómodo y elegante.", icono: "♜" },
    { id: "terraza", nombre: "Terraza", descripcion: "Disfruta de una experiencia al aire libre.", icono: "☀" },
    { id: "barra", nombre: "Barra", descripcion: "Un espacio más informal y cercano.", icono: "◈" }
  ];

  const horarios = [
    "12:00", "12:30", "13:00", "13:30", "14:00",
    "14:30", "15:00", "18:00", "18:30", "19:00",
    "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  const nombreMes = mesActual.toLocaleDateString("es-PE", {
    month: "long",
    year: "numeric"
  });

  const primerDia = new Date(
    mesActual.getFullYear(),
    mesActual.getMonth(),
    1
  ).getDay();

  const diasEnMes = new Date(
    mesActual.getFullYear(),
    mesActual.getMonth() + 1,
    0
  ).getDate();

  const espaciosVacios = primerDia === 0 ? 6 : primerDia - 1;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const fechaMaxima = new Date();
  fechaMaxima.setDate(fechaMaxima.getDate() + 60);
  fechaMaxima.setHours(0, 0, 0, 0);

  const mesAnterior = new Date(
    mesActual.getFullYear(),
    mesActual.getMonth() - 1,
    1
  );
  const mesSiguiente = new Date(
    mesActual.getFullYear(),
    mesActual.getMonth() + 1,
    1
  );

  const puedeRetroceder =
    mesAnterior.getFullYear() > hoy.getFullYear() ||
    (mesAnterior.getFullYear() === hoy.getFullYear() &&
      mesAnterior.getMonth() >= hoy.getMonth());

  const puedeAvanzar =
    mesSiguiente.getFullYear() < fechaMaxima.getFullYear() ||
    (mesSiguiente.getFullYear() === fechaMaxima.getFullYear() &&
      mesSiguiente.getMonth() <= fechaMaxima.getMonth());

  function cambiarMes(direccion) {
    setMesActual(
      new Date(
        mesActual.getFullYear(),
        mesActual.getMonth() + direccion,
        1
      )
    );
  }

  function seleccionarFecha(dia) {
    const nuevaFecha = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth(),
      dia
    );
    nuevaFecha.setHours(0, 0, 0, 0);

    if (
      nuevaFecha < hoy ||
      nuevaFecha > fechaMaxima ||
      nuevaFecha.getDay() === 1
    ) {
      return;
    }

    const fechaTexto =
      nuevaFecha.getFullYear() +
      "-" +
      String(nuevaFecha.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(nuevaFecha.getDate()).padStart(2, "0");

    setFecha(fechaTexto);
    setHora("");
    setConfirmada(false);
  }

  function fechaFormateada() {
    if (!fecha) return "Selecciona una fecha";

    const [anio, mes, dia] = fecha.split("-");
    const fechaObjeto = new Date(
      Number(anio),
      Number(mes) - 1,
      Number(dia)
    );

    return fechaObjeto.toLocaleDateString("es-PE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function confirmarReserva() {
    if (!fecha || !hora) return;

    if (!usuarioActivo) {
      abrirLogin();
      return;
    }

    setConfirmada(true);
  }

  function nuevaReserva() {
    setFecha("");
    setHora("");
    setPersonas(2);
    setZona("salon");
    setConfirmada(false);
  }

  const codigoReserva = fecha
    ? "ML-" + fecha.replace(/-/g, "") + "-" + hora.replace(":", "")
    : "";

  return (
    <main className="reservas-pagina">
      <div className="reservas-contenedor">
        <div className="reservas-encabezado">
          <p className="reservas-etiqueta">EXPERIENCIA MESA LIBRE</p>
          <h1>Reserva tu mesa</h1>
          <div className="reservas-decoracion"></div>
          <p>Elige el día, el espacio y el horario que prefieras.</p>
        </div>

        {confirmada ? (
          <div className="panel-reserva confirmacion-reserva">
            <div className="tick-reserva">✓</div>
            <p className="reservas-etiqueta">MESA LIBRE</p>
            <h2>¡Tu reserva está confirmada!</h2>
            <p>Gracias por elegirnos, {usuarioActivo}.</p>
            <p className="codigo-reserva">{codigoReserva}</p>

            <div className="resumen-reserva">
              <span className="resumen-etiqueta">DETALLES DE TU RESERVA</span>
              <div className="resumen-linea"></div>
              <p><span>Fecha</span><strong>{fechaFormateada()}</strong></p>
              <p><span>Hora</span><strong>{hora}</strong></p>
              <p><span>Personas</span><strong>{personas}</strong></p>
              <p><span>Espacio</span><strong>{zonas.find((item) => item.id === zona).nombre}</strong></p>
            </div>

            <button className="boton-reserva" type="button" onClick={nuevaReserva}>
              Realizar otra reserva
            </button>
          </div>
        ) : (
          <div className="res-grid">
            <section className="col-l panel-reserva">
              <div className="titulo-panel">
                <div>
                  <span className="numero-panel">01</span>
                  <h3>Fecha y personas</h3>
                </div>
                <span className="icono-panel">▦</span>
              </div>

              <div className="calendario-cabecera">
                <button
                  type="button"
                  onClick={() => cambiarMes(-1)}
                  disabled={!puedeRetroceder}
                  aria-label="Mes anterior"
                >
                  ‹
                </button>
                <strong>{nombreMes}</strong>
                <button
                  type="button"
                  onClick={() => cambiarMes(1)}
                  disabled={!puedeAvanzar}
                  aria-label="Mes siguiente"
                >
                  ›
                </button>
              </div>

              <div className="calendario-dias-semana">
                {["L", "M", "X", "J", "V", "S", "D"].map((dia) => (
                  <span key={dia}>{dia}</span>
                ))}
              </div>

              <div className="calendario-reserva">
                {Array.from({ length: espaciosVacios }, (_, i) => (
                  <span key={"vacio-" + i}></span>
                ))}

                {Array.from({ length: diasEnMes }, (_, i) => {
                  const dia = i + 1;
                  const fechaDia =
                    mesActual.getFullYear() +
                    "-" +
                    String(mesActual.getMonth() + 1).padStart(2, "0") +
                    "-" +
                    String(dia).padStart(2, "0");

                  const fechaObjeto = new Date(
                    mesActual.getFullYear(),
                    mesActual.getMonth(),
                    dia
                  );
                  fechaObjeto.setHours(0, 0, 0, 0);

                  const deshabilitado =
                    fechaObjeto < hoy ||
                    fechaObjeto > fechaMaxima ||
                    fechaObjeto.getDay() === 1;

                  return (
                    <button
                      type="button"
                      key={dia}
                      disabled={deshabilitado}
                      className={
                        fecha === fechaDia
                          ? "dia-calendario dia-seleccionado"
                          : "dia-calendario"
                      }
                      onClick={() => seleccionarFecha(dia)}
                    >
                      {dia}
                    </button>
                  );
                })}
              </div>

              <div className="leyenda-calendario">
                <span></span> Disponible
                <span className="leyenda-cerrado"></span> No disponible
              </div>
              <p className="nota-calendario">
                Selecciona una fecha disponible. Los lunes no atendemos.
              </p>

              <div className="titulo-horario">Número de personas</div>
              <div className="stepper-reserva">
                <button
                  type="button"
                  disabled={personas <= 1}
                  onClick={() => setPersonas(Math.max(1, personas - 1))}
                >
                  −
                </button>
                <div>
                  <strong>{personas}</strong>
                  <span>{personas === 1 ? "persona" : "personas"}</span>
                </div>
                <button
                  type="button"
                  disabled={personas >= 10}
                  onClick={() => setPersonas(Math.min(10, personas + 1))}
                >
                  +
                </button>
              </div>
            </section>

            <section className="col-m panel-reserva">
              <div className="titulo-panel">
                <div>
                  <span className="numero-panel">02</span>
                  <h3>Elige tu espacio</h3>
                </div>
                <span className="icono-panel">⌂</span>
              </div>

              <div className="zonas-reserva">
                {zonas.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={
                      zona === item.id
                        ? "zona-opcion zona-activa"
                        : "zona-opcion"
                    }
                    onClick={() => {
                      setZona(item.id);
                      setConfirmada(false);
                    }}
                  >
                    <span className="zona-icono">{item.icono}</span>
                    <strong>{item.nombre}</strong>
                    <small>{item.descripcion}</small>
                  </button>
                ))}
              </div>

              <div className="titulo-horario">Distribución de espacios</div>
              <div className="plano-wrap-reserva">
                <svg
                  className="plano-reserva"
                  viewBox="0 0 300 190"
                  role="img"
                  aria-label="Plano ilustrativo de los espacios del restaurante"
                >
                  <rect x="8" y="8" width="284" height="174" rx="8" fill="#101a27" stroke="#718092" />
                  <rect
                    className={zona === "terraza" ? "plano-activo" : "plano-zona"}
                    x="20" y="20" width="118" height="65" rx="5"
                  />
                  <rect
                    className={zona === "salon" ? "plano-activo" : "plano-zona"}
                    x="148" y="20" width="132" height="105" rx="5"
                  />
                  <rect
                    className={zona === "barra" ? "plano-activo" : "plano-zona"}
                    x="20" y="98" width="118" height="70" rx="5"
                  />
                  <text x="79" y="57" textAnchor="middle">TERRAZA</text>
                  <text x="214" y="75" textAnchor="middle">SALÓN</text>
                  <text x="79" y="137" textAnchor="middle">BARRA</text>
                  <path d="M148 140 H280" stroke="#718092" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="214" y="158" textAnchor="middle">ENTRADA</text>
                </svg>
              </div>
              <p className="nota-calendario">
                Selecciona el espacio que mejor se adapte a tu visita.
              </p>
            </section>

            <section className="col-r">
              <div className="panel-reserva panel-horarios">
                <div className="titulo-panel">
                  <div>
                    <span className="numero-panel">03</span>
                    <h3>Selecciona la hora</h3>
                  </div>
                  <span className="icono-panel">◷</span>
                </div>

                <p className="fecha-elegida">
                  Fecha elegida: <strong>{fechaFormateada()}</strong>
                </p>

                {fecha ? (
                  <>
                    <div className="titulo-horario">Almuerzo</div>
                    <div className="horarios-reserva">
                      {horarios.filter((item) => item < "16:00").map((horario) => (
                        <button
                          type="button"
                          key={horario}
                          className={hora === horario ? "horario-activo" : ""}
                          onClick={() => setHora(horario)}
                        >
                          {horario}
                        </button>
                      ))}
                    </div>

                    <div className="titulo-horario">Cena</div>
                    <div className="horarios-reserva">
                      {horarios.filter((item) => item >= "18:00").map((horario) => (
                        <button
                          type="button"
                          key={horario}
                          className={hora === horario ? "horario-activo" : ""}
                          onClick={() => setHora(horario)}
                        >
                          {horario}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mensaje-horarios">
                    <span>◷</span>
                    <p>Primero selecciona una fecha en el calendario para ver los horarios disponibles.</p>
                  </div>
                )}
              </div>

              <div className="resumen-reserva">
                <span className="resumen-etiqueta">TU EXPERIENCIA</span>
                <h3>Resumen de reserva</h3>
                <div className="resumen-linea"></div>
                <p><span>Cliente</span><strong>{usuarioActivo || "Inicia sesión"}</strong></p>
                <p><span>Fecha</span><strong>{fechaFormateada()}</strong></p>
                <p><span>Personas</span><strong>{personas}</strong></p>
                <p><span>Espacio</span><strong>{zonas.find((item) => item.id === zona).nombre}</strong></p>
                <p><span>Horario</span><strong>{hora || "Por seleccionar"}</strong></p>

                <button
                  type="button"
                  className="boton-reserva"
                  disabled={!fecha || !hora}
                  onClick={confirmarReserva}
                >
                  Confirmar reserva
                </button>
                <span className="texto-resumen">
                  {usuarioActivo
                    ? "Revisa los datos antes de confirmar."
                    : "Debes iniciar sesión para confirmar tu reserva."}
                </span>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default Reservas;
