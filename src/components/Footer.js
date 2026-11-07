import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contacto">

      <div className="footer-contenido">

        <div className="footer-marca">
          <h2>Mesa Libre</h2>
          <p>
            Una experiencia gastronómica única,
            donde los sabores y los buenos momentos
            se encuentran.
          </p>
        </div>

        <div className="footer-enlaces">
          <h3>Explora</h3>
          <a href="#inicio">Inicio</a>
          <a href="#menu">Menú</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#reservas">Reservas</a>
          <a href="#blog">Blog</a>
        </div>

        <div className="footer-contacto">
          <h3>Contacto</h3>
          <p>Correo: contacto@mesalibre.com</p>
          <p>Teléfono: +51 908 978 967</p>
          <p>Ubicación: Perú</p>
        </div>

        <div className="footer-redes">
          <h3>Síguenos</h3>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">TikTok</a>
        </div>

      </div>

      <div className="footer-final">
        <p>© 2026 Mesa Libre. Todos los derechos reservados.</p>
      </div>

    </footer>
  );
}

export default Footer;
