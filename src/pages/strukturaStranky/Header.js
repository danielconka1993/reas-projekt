import { NavLink } from "react-router-dom"
import "./css/Header.css"

const Header = () => {
  return <section className="header">
    <article className="nav-menu">
    <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/chci-nabidku">Chci Nabídku</NavLink></li>
          </ul>
      </nav>
    </article>
  </section>
}

export default Header