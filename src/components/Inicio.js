import "./Inicio.css";

function Inicio() {
  return (
    <section className="hero" id="inicio">

      <div className="hero-contenido">

        <h1>
          Una experiencia
          <br />
          gastronómica
          <br />
          <em>extraordinaria</em>
        </h1>

        <p>
          Descubre una experiencia buffet de alta gama.
          Disfruta de una variedad de platos exclusivos,
          preparados para convertir cada visita en un
          momento especial.
        </p>

        <a href="#menu" className="boton-hero">
          DESCUBRIR MENÚ
        </a>

      </div>

    </section>
  );
}

export default Inicio;
