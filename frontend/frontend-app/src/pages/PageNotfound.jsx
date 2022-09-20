import { Outlet, Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <main>
    <h1>OUPS SORRY</h1>
    <section>
      <article>
        <h2>Page non trouvée</h2>
        <p>La page recherchée est introuvable pour le moment</p>
        <p>Veuillez cliquer sur le bouton ci-dessous pour revenir à la page d'accueil</p>
          <Link to={`/`}>
            <button className="button">
              Revenir à la page d'accueil
            </button>
          </Link>
      </article>
    </section>
    <Outlet />
  </main>
  )
}

export default PageNotFound