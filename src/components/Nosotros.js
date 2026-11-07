import "./Nosotros.css";

function Nosotros() {
  return (
    <section className="nosotros" id="nosotros">

      <div className="nosotros-imagen">
        <img src="/img/hero.jpg" alt="Experiencia gastronómica Mesa Libre" />
      </div>

      <div className="nosotros-contenido">
        <span>CONOCE MESA LIBRE</span>

        <h2>
          Más que una comida,
          <em> una experiencia.</em>
        </h2>

        <div className="nosotros-linea"></div>

        <p>
          En Mesa Libre creemos que cada comida es una
          oportunidad para compartir y disfrutar.
          Por eso buscamos ofrecer una experiencia
          gastronómica especial en cada visita.
        </p>

        <p>
          Un espacio donde los sabores, la variedad
          y los buenos momentos se encuentran.
        </p>

        <a href="#reservas" className="boton-nosotros">
          CONÓCENOS MÁS
        </a>
      </div>

    </section>
  );
}

export default Nosotros;
