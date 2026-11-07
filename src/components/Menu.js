import "./Menu.css";

function Menu() {
  return (
    <section className="menu" id="menu">

      <div className="menu-titulo">
        <span>NUESTRA PROPUESTA GASTRONÓMICA</span>
        <h2>Una selección para cada gusto</h2>
        <div className="linea-dorada"></div>
        <p>Descubre sabores únicos preparados para sorprenderte.</p>
      </div>

      <div className="menu-tarjetas">

        <div className="tarjeta-menu">
          <img src="/img/carnes.jpg" alt="Carnes" />
          <div className="tarjeta-contenido">
            <span>01 / NUESTRA ESPECIALIDAD</span>
            <h3>Carnes</h3>
            <p>Sabores intensos y preparaciones especiales.</p>
          </div>
        </div>

        <div className="tarjeta-menu">
          <img src="/img/fria.jpg" alt="Comida fría" />
          <div className="tarjeta-contenido">
            <span>02 / FRESCURA Y VARIEDAD</span>
            <h3>Comida fría</h3>
            <p>Una selección fresca para disfrutar cada momento.</p>
          </div>
        </div>

        <div className="tarjeta-menu">
          <img src="/img/bebidas.jpg" alt="Bebidas" />
          <div className="tarjeta-contenido">
            <span>03 / EL COMPLEMENTO IDEAL</span>
            <h3>Bebidas</h3>
            <p>El acompañamiento perfecto para tu experiencia.</p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Menu;
