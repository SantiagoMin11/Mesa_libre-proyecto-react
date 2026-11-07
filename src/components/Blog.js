import "./Blog.css";

function Blog() {
  return (
    <section className="blog" id="blog">

      <div className="blog-titulo">
        <span>NOTICIAS Y NOVEDADES</span>
        <h2>Descubre nuestro blog</h2>
        <div className="blog-linea"></div>
        <p>Conoce más sobre el mundo gastronómico de Mesa Libre.</p>
      </div>

      <div className="blog-tarjetas">

        <article className="tarjeta-blog">
          <img src="/img/blog1.jpg" alt="Experiencia gastronómica" />
          <div className="blog-contenido">
            <span>GASTRONOMÍA</span>
            <h3>El arte de disfrutar cada sabor</h3>
            <p>
              Descubre cómo los sabores y los ingredientes
              crean experiencias inolvidables.
            </p>
          </div>
        </article>

        <article className="tarjeta-blog">
          <img src="/img/blog2.jpg" alt="Preparaciones especiales" />
          <div className="blog-contenido">
            <span>EXPERIENCIAS</span>
            <h3>Momentos para compartir</h3>
            <p>
              La buena comida se disfruta aún más
              cuando se comparte con quienes queremos.
            </p>
          </div>
        </article>

        <article className="tarjeta-blog">
          <img src="/img/blog3.jpg" alt="Variedad gastronómica" />
          <div className="blog-contenido">
            <span>NOVEDADES</span>
            <h3>Una experiencia diferente</h3>
            <p>
              Explora nuevas propuestas y descubre
              todo lo que tenemos para ofrecerte.
            </p>
          </div>
        </article>

      </div>

    </section>
  );
}

export default Blog;
